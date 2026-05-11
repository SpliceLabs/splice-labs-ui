# Version-E Swarm — Phase 3 Handoff

> Reference doc for resuming swarm work after Phase 2 shipped (2026-05-09). Pair with `docs/BRAND_THESIS.md` for strategic framing and `docs/VERSION_E_SWARM_HANDOFF.md` for Phase-2 build history.

---

## 1. Where Phase 2 Left Off

Phase 2 successfully landed:

- Single fixed canvas spanning all sections of `version-e/`.
- Per-section regime registry (`config/sectionRegimes.ts`) — drop a GLB or change a generator, that is the only file touched.
- Two-phase disperse → reform transitions driven by IntersectionObserver.
- Hero retains its 3-step internal sequence (humanoid → cloud → sphere) driven by hero-internal scroll progress.
- Scroll-up-with-page motion + snap-to-center on section change, with smoothed migration from prior posY.
- Cursor-driven flock perturbation (pointer-events routing through canvas; CTAs opt back in).
- Per-regime boids and material presets (`tight`, `loose`, `traveling`, `frozen`; `graphite`, `graphiteEmissive`, `tealHot`).
- WebGPU-only path with graceful static fallback when `navigator.gpu` is absent.

### Key architectural pivot during Phase 2

The original Phase-2 plan called for live updates to three storage buffers (`t1Storage` / `t2Storage` / `t3Storage`) on each section change. **This does not work with three.js WebGPU as of r0.171.0.** Storage buffers created via `instancedArray` are uploaded to the GPU at first compute pass and never re-uploaded, regardless of:

- `BufferAttribute.needsUpdate = true`
- `BufferAttribute.version++`
- `setUsage(DynamicDrawUsage)`
- `addUpdateRange()`
- Bumping version on the StorageBufferNode wrapper itself

The fix that shipped: **all section regimes are pre-baked into one big concatenated storage buffer at mount.** Three float uniforms (`t1OffsetFloat`, `t2OffsetFloat`, `t3OffsetFloat`) hold which regime indices the kernel reads. Section change = update uniforms only — uniforms have a reliable upload path and cost essentially nothing.

**Tradeoff lost:** the original "snapshot current visual state into t1" feature is gone. When transitioning out of hero mid-morph, t1 picks the closest hero step (round of current morph). The seam is hidden inside the cloud-disperse phase and not visible at typical transition speeds.

This is documented in code comments at `SwarmV7.tsx` (the `SwarmRegimeBank` type definition) and `SwarmEngine.tsx` (the `buildRegimeBank` function header).

---

## 2. Phase-3 Primary Goals

The three items below are the headline work for Phase 3. Do these before any of the secondary cleanups in §3.

### 2.1 Teal emissive on velocity activity

**Why it matters:** This is the on-thesis feature still missing from Phase 2. The brand thesis (§3 of `BRAND_THESIS.md`) demands the site argue "AI-first / agent-native" through interaction, not assertion. Particles glowing teal when active and fading graphite when settled visually communicates the agent metaphor — the swarm is doing work, not decorating.

**Spec:**

- Modify `src/lib/swarm/fluidPBR.ts` to add an emissive term to `colorNode`.
- Emissive intensity proportional to per-particle velocity magnitude. Pulled from `velocityStorage.element(idx)` already available in the kernel (passed through to vertex stage).
- Color: splice teal `#00D6A4`.
- Tunable uniforms (add to `pbr.uniforms`):
  - `uEmissiveColor` (Color, default teal)
  - `uEmissiveIntensity` (float, default ~1.5–2.0 — tune by feel)
  - `uEmissiveVelMin` (float, ~0.0) — velocity magnitude where emissive starts ramping
  - `uEmissiveVelMax` (float, ~2.0) — velocity magnitude where emissive saturates
- Engine-side: add `emissiveIntensity` to `SwarmMaterialConfig` and `MATERIAL_PRESETS`. Default presets:
  - `graphite`: 0
  - `graphiteEmissive`: 1.5
  - `tealHot`: 2.5
- Emissive should respect the existing material lerp during transitions.

**Alternative considered:** drive emissive from `freeStorage` (boids "snapped" state) instead of velocity. Velocity is the cleaner signal — reads as "fast = active = glowing" which matches the agent metaphor better than "snapped = something happened."

**Validation:**

- Hero should be mostly-graphite at rest (low velocity in formation) with subtle teal flicker as boids do their thing.
- During transition: cloud-disperse phase is bright teal (high velocity), reform fades back to graphite.
- Agents section (`boids: "loose"`) should glow most consistently.
- Security section (`boids: "frozen"`) should be fully graphite (zero velocity).

### 2.2 Strip debug logs

Phase 2 left two `console.log` statements in for diagnosis:

- `SwarmEngine.tsx` — logs on every section change (`[swarm] section change`, includes from/to/idx values).
- `SwarmV7.tsx` — logs on every `setRegimeIndices` call (`[swarm] setRegimeIndices`).

These are no longer needed and should be removed wholesale, including their `// eslint-disable-next-line no-console` annotations.

If we want to keep observability for debug builds, gate behind `import.meta.env.DEV` and consolidate into a single helper:

```ts
const debug = import.meta.env.DEV;
const swarmLog = (msg: string, data?: unknown) => {
  if (debug) console.log(`[swarm] ${msg}`, data);
};
```

Otherwise just delete.

### 2.3 Color lerp during material transitions

Current behavior in `regimes.ts` — `lerpMaterial`:

```ts
return {
  color: t < 0.5 ? a.color : b.color,
  // ... numeric fields lerp normally
};
```

This snaps the color at midpoint. **Fine today** because all current `MATERIAL_PRESETS` use the same color (`#1B1E22`). The moment a regime references `tealHot` (color `#0D3D33`), the snap will be visible at t=0.5 of any transit involving tealHot.

**Spec:**

- Use `THREE.Color.lerpColors(a, b, t)` for proper RGB interpolation.
- Keep `SwarmMaterialConfig.color` as a hex string at the registry level (developer-friendly).
- Convert to/from `THREE.Color` only inside `lerpMaterial`:

```ts
import { Color } from "three";
const tmpA = new Color();
const tmpB = new Color();
const tmpOut = new Color();

export function lerpMaterial(a, b, t) {
  tmpA.set(a.color);
  tmpB.set(b.color);
  tmpOut.copy(tmpA).lerp(tmpB, t);
  return {
    color: `#${tmpOut.getHexString()}`,  // hex out preserves SwarmMaterialConfig contract
    // ... numeric fields lerp normally
  };
}
```

**Important:** the temporaries are module-scope (allocated once). `lerpMaterial` runs every frame during transit, so no per-frame allocation.

**Validation:** add a temporary regime entry that uses `tealHot`, scroll into and out of it, confirm the swarm tints continuously rather than snapping.

---

## 3. Secondary Cleanups (after the three above)

Flag these as polish items. None are blocking; do them when you next have the file open.

### 3.1 Unused `BufferAttribute` import in SwarmV7

After the big-buffer refactor, `BufferAttribute` is only referenced in the `Built` type for `velocityAttr`. Confirm it's still load-bearing (it is — the readback path for boids regime detection uses it). If we ever drop that path, drop the import.

### 3.2 Reconsider scroll-up posY behavior

Current behavior in `SwarmEngine.tsx`:

- Settled state: `posY = (scrollY − anchorScrollY) × SCROLL_TO_WORLD`. Swarm rises off the top of viewport as user scrolls into the section.
- During transit: lerps from `fromPosY` back to 0 over `TRANSIT_MS`.

This means **for the entire body of any section past hero, the swarm is invisible** (above the viewport). Visible only during the brief migration into the new section, then gone.

The user explicitly chose this over parallax-trail behavior ("the swarm follows instead of scrolling up and recentering"), so don't undo it without a conversation. But worth confirming on a fresh-eyes review:

- Does the swarm need to be visible while reading section copy?
- Or is "swarm migrates → reshapes → ascends as you scroll → next section pulls it back" the intended rhythm?

If we want the swarm *visible* while reading sections, possibilities:

- Lock posY to 0 during settled state (swarm always at viewport center, no scroll-up motion). Loses the "moves with page" feel.
- Slow the SCROLL_TO_WORLD factor (currently 0.005) so swarm exits more slowly — visible for the first half of a section.
- Section-internal "anchor zones" — swarm sticks for the first 50vh of a section, then scrolls up.

Talk to the user before changing.

### 3.3 Phase-3 mobile / no-WebGPU CSS evocation

Flagged in the original Phase-2 handoff (§4 — Open question 3). Mobile users currently see no swarm at all. The brand thesis demands the AI-first claim hold on every device. A CSS-only swarm-evocation (animated splice-line patterns, particle SVGs) on the mobile fallback path would close this gap.

Out of scope for Phase 3 unless explicitly prioritized. File as Phase 4.

### 3.4 Section anchor offsets (L/R alternation)

Locked at "all-center for now" during Phase 2. The proposal in the original handoff (§4 — proposed table) was to alternate left/right per section to give scroll its own rhythm. Worth revisiting once the rest is shipped — but only if the swarm is visible during sections (see §3.2).

### 3.5 `?regime=X` dev URL parameter

Originally proposed as a tuning DX — load `localhost:8081/?regime=helios` and snap the swarm to that regime for visual debugging. Locked as "skip" during Phase 2. ~20 lines to add; useful once we start tuning per-regime parameters seriously.

Implementation sketch: in `SwarmEngine` mount effect, parse `URLSearchParams`, if `regime` matches a `SectionId`, force `activeSectionRef.current = regime` and skip the IntersectionObserver wiring entirely.

### 3.6 Per-regime intra-section morph

The architecture supports `kind: "sequence"` for any section, not just hero. No section other than hero uses it today. If Helios eventually wants its 4 rings to grow one-by-one as the user scrolls through the section, that's a sequence regime keyed off section-internal scroll progress (same driver hero uses).

Mention this as available capacity, not a goal.

### 3.7 Generator parameter validation

`config/sectionRegimes.ts` calls generators via thin lambdas with hardcoded params. TypeScript doesn't validate the *meaning* of the numeric params (e.g. `cubeShellsTargets(n, 3, 0.4, 1.4)` — is 3 the count or the spacing?). If the registry grows, consider Zod schemas per generator. Not urgent.

### 3.8 Duplicated humanoid sampling

Hero step 0 and Founders both sample `humanoid.glb`. Currently sampled twice during `buildRegimeBank` — same GLB, two near-identical Vector3[] outputs. Could memoize the sample result by URL. Trivial savings (~5ms at mount), but worth it if more sections start sharing GLBs.

### 3.9 NaN safety on freeStorage

The kernel's `freeStorage` NaN handling falls through to `freeStorage.element(idx)` directly. Worth confirming WebGPU compute can produce NaN for `free` (typically 0–1 clamped). If not, the safety check is dead code and can come out.

### 3.10 SwarmHero.tsx is gone

Phase 2 deleted `version-e/swarm/SwarmHero.tsx` (orphaned after HeroSection lifted into the global canvas). Anything still referencing it should already be broken at the type level — confirm via `grep -r SwarmHero src/`.

---

## 4. Decisions Locked from Phase 2 (do not relitigate)

For continuity across context windows, these are settled:

- **Single fixed canvas** spanning all sections (not per-section).
- **Two-phase transitions:** disperse → reform via cloud waypoint.
- **Hero internal morph stays:** 3-step sequence driven by hero scroll.
- **Concentric rings for Helios.** (Cube lattice was alternative; rings won.)
- **Cube lattice for Security.** (Sphere shell was alternative; cube won.)
- **Humanoid mesh-surface for Founders.** (Bones was alternative; mesh won — bookends hero's bones with denser fidelity.)
- **All section anchors center.** (Per-section L/R offsets deferred.)
- **Scroll = 1:1 swarm motion (rises off top), section change = snap-recenter w/ migration lerp.**
- **Big concatenated buffer + offset uniforms** is the kernel target-update mechanism. Do not retry per-buffer rewrites unless three.js WebGPU storage-buffer upload story changes upstream.
- **drei `useGLTF`**, not raw `useLoader(GLTFLoader)`. drei wires meshopt + draco automatically; we shipped a meshopt-compressed `humanoid.glb`.
- **No leva at runtime.** All uniform-feeding values are plain TS literals or refs the engine writes directly. The leva-with-WebGPU-TSL race is documented in memory `feedback_leva_with_webgpu_tsl.md` and Phase 1's handoff.

---

## 5. Quick-Resume Checklist

1. `cd /Users/jake/dev/splice-labs/design-exploration/splice-identity-foundry && npm run dev`
2. Visit `localhost:8081/`. Scroll. Confirm each section shows its registered shape (hero humanoid, value cloud, commitments lattice, projects 3 cubes, helios rings, agents free swarm, security cube lattice, founders humanoid, contact disk).
3. Read these files in order before changing anything:
   - `docs/BRAND_THESIS.md`
   - `docs/VERSION_E_SWARM_HANDOFF.md` (Phase 2 build history)
   - `docs/VERSION_E_SWARM_PHASE3_HANDOFF.md` (this file)
   - `src/components/marketing/version-e/swarm/SwarmEngine.tsx`
   - `src/components/marketing/version-e/swarm/SwarmV7.tsx`
   - `src/lib/swarm/fluidPBR.ts` (for §2.1)
   - `src/lib/swarm/regimes.ts` (for §2.3)
4. Start with Phase-3 §2.1 (teal emissive). It's the highest on-thesis return.
5. Then §2.2 (strip logs) and §2.3 (color lerp) — both small, both prerequisites for adding any new material preset that uses tealHot.

---

## 6. References

- `docs/BRAND_THESIS.md` — strategic positioning, audiences, decision criteria.
- `docs/VERSION_E_SWARM_HANDOFF.md` — Phase 2 build history. Includes the leva/TSL race notes and the Phase-1 → Phase-2 build-order log.
- `~/.claude/projects/-Users-jake-dev-splice-labs-design-exploration/memory/feedback_leva_with_webgpu_tsl.md` — leva race learning.
- `~/.claude/projects/-Users-jake-dev-splice-labs-design-exploration/memory/project_splice_labs_positioning.md` — studio + 3-audience framing.
- three.js WebGPU storage buffer upload behavior (Phase-2 discovery, no upstream issue link yet) — drives the big-buffer architecture documented in §1.
