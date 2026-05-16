# Swarm Storage Buffer Consolidation — Proposal

> Status: **proposed, not implemented**. Captured for the next time we need a
> new per-particle channel (color, mass, audio amplitude, etc.). Until then
> the per-particle color use case is handled by shader-side classification
> (see `Alternative already shipped` below).

## Current state

The Version-E swarm compute kernel binds **10 storage buffers**, which is
exactly our adapter's `maxStorageBuffersPerShaderStage` ceiling (default
WebGPU limit is 8; we request 10 in `SwarmCanvas.tsx`).

| # | Buffer                | Type   | Per-particle stride |
|---|-----------------------|--------|---------------------|
| 1 | `positionStorage`     | vec3   | 12 B                |
| 2 | `velocityStorage`     | vec3   | 12 B                |
| 3 | `allStorage`          | vec3   | 12 B (× R regimes)  |
| 4 | `allOmegasStorage`    | float  | 4 B (× R regimes)   |
| 5 | `allTiltsStorage`     | float  | 4 B (× R regimes)   |
| 6 | `allCentersStorage`   | vec3   | 12 B (× R regimes)  |
| 7 | `scaleVarStorage`     | vec2   | 8 B                 |
| 8 | `freeStorage`         | float  | 4 B                 |
| 9 | `armedStorage`        | float  | 4 B                 |
|10 | `targetStorage`       | vec3   | 12 B                |

Adding an 11th buffer (e.g. per-particle color override) requires a higher
adapter limit, which not every device exposes. On the dev machine the
adapter caps out at 10.

## The problem

Several of the per-regime float buffers are **logically paired**. They are
read together, indexed identically, and written together at bake time:

- `omegas` and `tilts` (angular velocity + orbital tilt — only meaningful
  together, both inputs to `applyOrbital` per slot).
- `free` and `armed` (boids "free flag" + "rearm flag" — both per-particle
  scalar state, both rewritten by the same kernel branch).

WebGPU charges one binding slot per buffer, not per scalar. Packing pairs
into `vec2`s would cost zero new bytes but save **2 slots**.

## Proposal

Combine the four float buffers into two `vec2` buffers:

| Replacement              | Type | Contents                       | Replaces        |
|--------------------------|------|--------------------------------|-----------------|
| `allOrbitParamsStorage`  | vec2 | `(omega, tilt)` × R regimes    | omegas, tilts   |
| `boidsFlagsStorage`      | vec2 | `(free, armed)`                | free, armed     |

Net effect: **10 → 8 buffers**. That's:

- Back under the default WebGPU limit (so we could drop the
  `requiredLimits` request and broaden device support).
- **2 slots free** for future per-particle channels: color, mass,
  emission, audio amplitude, lifetime, anything.

## Trade-offs

- **Pro:** more headroom, broader device support, no new bytes on device.
- **Pro:** the paired-read sites (`applyOrbital`, free/armed update) read
  one vec2 instead of two floats — fewer storage reads per particle.
- **Con:** packing kernel — the bake loop in `SwarmV7.tsx` (the
  per-regime fill loop around line 320) gets four-line tweaks per packed
  buffer. Not architectural, just careful.
- **Con:** `boidsFlagsStorage` mixes two semantically distinct flags; a
  future refactor might want to split them again. Easy to undo.
- **Con:** dev-panel diagnostics that print individual flags will need to
  pull `.x` / `.y` instead of the scalar storage directly.

## Implementation sketch

### 1. SwarmV7.tsx — buffer layout

```ts
// Replace:
const allOmegasArr = new Float32Array(R * N);
const allTiltsArr = new Float32Array(R * N);
// With:
const allOrbitParamsArr = new Float32Array(R * N * 2);
// Layout: [r0_p0_omega, r0_p0_tilt, r0_p1_omega, r0_p1_tilt, …]

// Pack:
allOrbitParamsArr[obase + i * 2 + 0] = omegas[src];
allOrbitParamsArr[obase + i * 2 + 1] = tilts[src];

// Storage:
const allOrbitParamsStorage = instancedArray(allOrbitParamsArr, "vec2");
```

Same shape for `boidsFlagsStorage`.

### 2. SwarmV7.tsx — kernel reads

```ts
// Was:
const t1w = allOmegasStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
const t1tilt = allTiltsStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
// Now:
const t1op = allOrbitParamsStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
const t1w = t1op.x;
const t1tilt = t1op.y;
```

`applyOrbital` signature unchanged — it still takes `omega` and `tilt` as
separate scalars.

### 3. SwarmCanvas.tsx — drop requiredLimits

Once consolidated to 8 buffers, the explicit `requiredLimits` request is no
longer needed:

```ts
const renderer = new WebGPURenderer({ canvas, antialias: true, alpha: true });
```

Devices with stricter limits then become first-class supported.

### 4. SwarmEngine.tsx — bank build

No change: the engine still produces `omegasPerRegime` and `tiltsPerRegime`
as separate `Float32Array`s. The pack-into-vec2 step lives in SwarmV7's
fill loop, the only place that knows the on-device layout.

## When to do this

Trigger this work when **any** of the following is true:

1. We need a 9th category of per-particle data on top of what's there now
   (color, mass, audio amp, etc.).
2. We want to drop the `requiredLimits: { maxStorageBuffersPerShaderStage: 10 }`
   to broaden device support.
3. A profile shows the paired storage reads (`omegas` then `tilts` in
   `applyOrbital`) showing up as a hot path — packed reads are one
   memory transaction instead of two.

Until one of those lands, the current layout is fine.

## Alternative already shipped

The first concrete trigger (per-particle sun color for the Helios regime)
was solved **without** consolidation, via **shader-side classification**:

- Engine writes a `tintRadius` + `tintColor` + `tintActive` uniform set
  per active section.
- Fragment shader checks `distance(target.xz, 0) < tintRadius` and mixes
  base color with `tintColor` by `tintActive`.

That uses zero new storage buffers — the per-particle "is sun?" decision
is recomputed every frame from each particle's already-stored target
position. Cheap, regime-aware, and stays under the buffer cap.

Per-regime tint config lives on `RegimeStep.tint?: { color, radius }`.
Helios gets `tint: { color: "#FFB800", radius: 0.3 }`.

If a future case needs **arbitrary** per-particle colors (not "all
particles within radius R of the rotation center"), consolidation is the
right answer; classification falls down for irregular subsets.
