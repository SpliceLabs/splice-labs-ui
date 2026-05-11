# Version-E Swarm Hero — Handoff & Phase-2 Plan

> Reference doc for resuming this work in a new context window without re-reading the full chat. Pair with `docs/BRAND_THESIS.md` for the strategic framing.

---

## 1. Goals

### Strategic
Splice Labs is an **AI-first venture studio that builds AI-native companies**. The marketing site must:

1. Land the AI-first studio claim as the primary message.
2. Serve three audiences in parallel — founders (we want to attract), investors, and clients.
3. **Be itself an artifact of an AI-first studio** — interactive, generative, visually narrative. A static site contradicts the thesis. (See `docs/BRAND_THESIS.md`.)

### Tactical (this work stream)
Refactor `splice-identity-foundry/src/components/marketing/version-e/` to lean into visual storytelling using the swarm animation prototyped in `demo/src/versions/V7.tsx` + `demo/src/versions/SwarmV7.tsx`. Specifically:

- Land the V7 swarm in the hero (Phase 1).
- Each subsequent section gets its own regime/mesh that **reinforces the section's argument** (Phase 2).
- Apply splice palette throughout.
- Hide Leva controls, eventually remove them.
- Disable cursor-driven regime cycling — section/scroll drives morph instead. Cursor only perturbs the flock locally.

### Non-goals
- Visual system redesign (graphite + electric teal + Space Grotesk/Mono + splice-line motif stays).
- Hype rebrand (no "revolutionary," no chains/coins/hexagons/shields).
- Maximalism (interactivity must earn its place, not decorate).
- Pivot to generic "AI studio" — the agent-native + AI×DeFi wedge is the substance.

---

## 2. What Phase 1 Shipped

### Files added
| Path | Purpose |
|---|---|
| `src/lib/swarm/morphMesh.ts` | Copied verbatim from `demo/src/lib/morphMesh.ts`. Vertex morph (poly→blob→bird) TSL graph. |
| `src/lib/swarm/fluidPBR.ts` | Copied verbatim from `demo/src/lib/fluidPBR.ts`. Fragment PBR colorNode + equirect/hemisphere env samplers. |
| `src/lib/swarm/targets.ts` | Copied verbatim from `demo/src/targets.ts`. Target generators: `humanoidBonesTargets`, `cloudTargets`, `sampleMeshSurface`, `sphereTargets`, `cubeShellTargets`, `torusTargets`, `helixTargets`, `diskTargets`, `waveTargets`. |
| `src/components/marketing/version-e/swarm/SwarmV7.tsx` | Copied from `demo/src/versions/SwarmV7.tsx`. Only change: import paths rewritten to `@/lib/swarm/...` and TSL imported from `three/webgpu` (not `three/tsl`). |
| `src/components/marketing/version-e/swarm/SwarmHero.tsx` | New — hero canvas wrapper with hardcoded splice palette, WebGPU detect + graceful fallback, scroll-driven morph 0→2 across hero height, no leva. |
| `public/humanoid.glb` | Copied from `demo/public/humanoid.glb` (5.4 MB). Used by `useGLTF(MODEL_URL)`. |

### Files modified
| Path | Change |
|---|---|
| `src/components/marketing/version-e/HeroSection.tsx` | Wraps existing hero copy in `<SwarmHero>`. Hero copy structure preserved; canvas absolute-positioned behind, copy z-10 with `pointer-events-none` wrapper + `[&_a/button/input/textarea]:pointer-events-auto` to keep CTAs clickable while letting pointermove reach the canvas for boid perturbation. |
| `vite.config.ts` | `@vitejs/plugin-react-swc` → `@vitejs/plugin-react` (Babel) to match demo. Removed `lovable-tagger` plugin. Added `resolve.dedupe: ["three", "@react-three/fiber", "@react-three/drei"]` and `optimizeDeps.exclude: ["three", "three/webgpu", "three/tsl"]`. |
| `package.json` | Pinned `three: 0.171.0`, `@types/three: 0.171.0`. Pinned `leva: ^0.9.36` to match demo (later replaced by hardcoded constants — leva no longer used at runtime). Removed `lovable-tagger`. Replaced `@vitejs/plugin-react-swc` with `@vitejs/plugin-react@^4.3.4`. |
| `index.html` | Removed `<meta property="og:image" content="https://lovable.dev/...">`, `<meta name="twitter:image" content="https://lovable.dev/...">`, `<meta name="twitter:site" content="@Lovable">`. |

### Behavior delivered
- Hero renders splice-line + display-typography copy on top of a fixed-position WebGPU canvas.
- ~2000 instanced morph-mesh particles with boids (separation/alignment/cohesion + soft attractor + cursor ray repulsion).
- Three target regimes pre-built per scene: humanoid (from `humanoid.glb` mesh surface, falls back to bone skeleton), cloud, sphere.
- Scroll progress through the hero element (top→bottom) maps linearly to `stateRef.current.morph` 0→2 (humanoid → cloud → sphere). `regimeEnabled=false`.
- WebGPU detect at mount via `navigator.gpu` + WebGPURenderer init. If unavailable: canvas does not mount, hero falls back to children-only render preserving the splice-line + typography aesthetic.
- Splice palette baked: bg `#0E1114`, particle base `#1B1E22` (surface-raised), metalness 0.6, roughness 0.4, env preset `night`, envIntensity 0.9.

### What was hard / load-bearing learnings (saved to project memory)

The session burned a lot of cycles chasing `Uncaught Error: Uniform "null" not declared.` thrown by `WGSLNodeBuilder.getNodeUniform`. Things tried that **were not the cause**:

- pnpm vs npm (full reset, npm install, same error)
- `three/tsl` vs `three/webgpu` import (rewrote all TSL imports to `three/webgpu` — `three.tsl.js` is just a thin re-export wrapper)
- `three@0.184.0` vs `0.171.0` (downgraded to match demo)
- `@vitejs/plugin-react-swc` vs `@vitejs/plugin-react` (Babel) — swapped to Babel
- `lovable-tagger` plugin in dev mode — fully removed
- vite `optimizeDeps.include` vs `exclude` for three — exclude now
- vite `resolve.dedupe` for three
- multiple-three-instances warning — deduped to single 0.171.0 install
- Drei `<Environment preset>` cubemap fallback (separate bug — fixed by using `useEnvironment` only via `EnvLoader`, dropping the `<Environment>` JSX)

**Actual cause:** leva's `useControls` returns `undefined` for control values briefly during first commit. Wiring `v.someControl` straight into a TSL uniform's `.value` meant the WebGPU compute kernel compiled with `value === undefined` → `getValueType(undefined)` → `null` → `getNodeUniform(uniformNode, null)` throws `Uniform "null" not declared.`. Demo "worked" because its kernel happens to compile after leva initial values land; SwarmHero's extra Suspense + Canvas mount timing reordered this and exposed the race.

**Fix:** All uniform-feeding values are hardcoded constants at the top of `SwarmHero.tsx`. Leva removed entirely from the runtime path. Memory note `feedback_leva_with_webgpu_tsl.md` records this so we don't redo the chase.

---

## 3. Phase 1 Source-of-Truth Constants

These live in `src/components/marketing/version-e/swarm/SwarmHero.tsx`. Do **not** reintroduce leva over this path without a delayed-mount guard that proves every value is defined before the kernel compiles.

```ts
const N = 2000;
const MODEL_URL = "/humanoid.glb";
const ENV_PRESET = "night";
const BG_COLOR = "#0E1114";
const FOG_NEAR = 5;
const FOG_FAR = 2;

const MATERIAL = {
  color: "#1B1E22",
  metalness: 0.6,
  roughness: 0.4,
  exposure: 1.0,
  envIntensity: 0.9,
};
const ANIM = {
  hoverSpeed: 0.6,
  hoverAmplitude: 0.08,
  autoSpinSpeed: 0.05,
};
const TRANSFORM = {
  posX: 0, posY: 0, posZ: 0,
  rotX: 0, rotY: -2.15, rotZ: 0,
  scale: 1,
};
const FLUID = {
  particleMorph: 0,
  morphInnerR: 0.05,
  morphOuterR: 0.5,
  detail: 2,
  waveAmp: 0.27,
  waveSpeed: 6.6,
  phaseRandom: 0.38,
  waveLayers: 2,
  flapSpeed: 16.6,
  flapAmount: 18.3,
  birdThick: 0.04,
};
const BOIDS = {
  separation: 0.15,
  alignment: 0.2,
  cohesion: 0.2,
  damping: 0.97,
  speedLimit: 2.4,
  attractorStrength: 8,
  attractorRange: 0.3,
  rayRadius: 0.2,
  rayStrength: 80,
  particleScale: 0.04,
  snapThreshold: 0.84,
  recoveryRate: 0.28,
  regimeEnabled: false,
  regimeVelocityThreshold: 0.5,
  regimeRatio: 0.4,
  regimeCooldown: 7,
};
```

---

## 4. Phase 2 Plan — Section-Driven Regime Continuity

### Goal
The animation should carry through every section of `version-e/`. Each section gets its own **regime** (target shape + boids/material tuning) that **visually reinforces the section's argument**. Scroll position drives transitions; the swarm becomes the spine of the page narrative.

### Decisions from Phase-1 chat (locked unless we revisit)
- **One canvas, sticky/fixed full-viewport background.** Sections render as semi-transparent content over the swarm. (Phase-1 deferred this — landed hero-only.)
- **Material direction: dark graphite particles with teal emissive on activity.** Phase 1 ships pure graphite; Phase 2 adds teal emissive driven by per-particle `freeStorage` (boids "snapped" state) so motion glows teal and settled particles fade.
- **Cursor is decoration only**, never drives regime. Scroll/section drives morph via the `<IntersectionObserver>`-or-scroll-progress pattern.

### Proposed section → regime table

| # | Section | Regime | Argument it makes |
|---|---|---|---|
| 0 | **Hero** | `humanoid → cloud → sphere` (already shipped) | "Built around agents that started embodied, dissolve into computation, resolve into form." |
| 1 | **Value** | `cloud` (slow drift, low cohesion, no formation) | Disorder before structure — value is the *why*. |
| 2 | **Commitments** | `helix` (vertical, slow rotation) | Pipeline / chain of commitments / sequential linkage. |
| 3 | **Projects** | `cube-shell` (3 distinct clusters indexed to project count) | Discrete portfolio entries with clear boundaries. |
| 4 | **Helios** | `concentric rings` (4 layers — approval, policy, orchestrator, runtime) | Literal stack diagram from the section copy. |
| 5 | **Agents** | `swarm dispersed` (boids on, weak attractor, formation = soft cloud) | Agents acting with scoped autonomy — flocking. |
| 6 | **Security** | `sphere shell` (tight lattice, low jitter, boids off) | Ordered, contained, audited. |
| 7 | **Founders** | `humanoid bones` (back to embodiment) | "Built by Operators" — humans behind the machine. |
| 8 | **Contact** | `wave` (slow horizontal) | Conversation, calm, signal-not-noise. |

`targets.ts` already exports the helpers we need: `humanoidBonesTargets`, `cloudTargets`, `sphereTargets`, `cubeShellTargets`, `torusTargets`, `helixTargets`, `diskTargets`, `waveTargets`, `sampleMeshSurface`. Concentric rings (Helios) needs a new helper — straightforward: 4 disk samples at different radii.

### Architecture sketch

```
<VersionE>
  <SwarmCanvas>                         <-- single fixed canvas, full viewport
    <SwarmEngine                        <-- one SwarmV7 instance, lives across all sections
      regimes={REGIME_TABLE}            <-- 9 named regimes, each {targets, boidsOverrides, materialOverrides}
      activeRegimeRef                   <-- current + next regime + transition t (0..1)
    />
  </SwarmCanvas>
  <SectionScroller>                     <-- IntersectionObserver per section
    <HeroSection />
    <ValueSection />
    <CommitmentsSection />
    ...
  </SectionScroller>
</VersionE>
```

### Concrete steps (in build order)

1. **Extract `SwarmCanvas` from `SwarmHero`** — same Canvas + WebGPU detect + EnvLoader, but mounts at `VersionE` root with `position: fixed`, `inset: 0`, `z-index: 0`. Sections render over it at `z-index: 10` with `pointer-events-none` on wrappers.
2. **Lift `stateRef` + scroll/IntersectionObserver logic to `VersionE`** — observe each section, when one becomes the most-visible, set `activeRegimeRef.current = regimeForSection(id)`. Keep a `prevRegimeRef` + `tRef` for cross-fade interpolation.
3. **Add `concentricRingsTargets(N, layers, baseR, layerSpacing)` to `targets.ts`** — 4 rings is the Helios case.
4. **Extend `SwarmV7`** to support **3+ targets** instead of 3 fixed slots (`t1/t2/t3`). Either:
   - Generalize to `targets: Vector3[][]`, with `morph` selecting two adjacent slots and lerping. Existing 3-slot logic is `morph ∈ [0,2]`; generalize to `morph ∈ [0, N-1]`.
   - OR keep 3 slots and pre-bake the 3 regimes that are "active around the current section" — swap target buffers when scroll crosses a boundary.
   - The first option is cleaner; the second avoids buffer-swap hitches but is more state machine. Recommend option 1.
5. **Per-regime boids/material overrides** — extend `SwarmBoidsConfig` and `SwarmMaterialConfig` to be optionally a tuple `[fromConfig, toConfig]` lerped by scroll progress. Or simpler: keep configs constant, and only the *target shape* changes per regime. Decide based on whether any section needs different boid behavior (e.g. Security wants `boids off`; that requires per-regime override).
6. **Teal emissive on activity** — modify `fluidPBR.ts` to add an emissive term proportional to per-particle `freeStorage` (already present, marks "snapped/disturbed" particles). Color: `#00D6A4` × `freeStorage` × emissiveIntensity uniform. Settled particles fade to graphite.
7. **Section-overlay tuning** — sections need a faint background fill (e.g. `bg-background/60 backdrop-blur-sm`) so dense copy is legible against the moving swarm. Hero stays unblurred (the swarm is the hero).
8. **Performance + perf budget** — single canvas at 2000 particles is the floor. Verify Lighthouse / FPS in Chrome on:
   - M-series Mac: target 60 FPS
   - Mid-range Windows laptop with WebGPU: target ≥45 FPS
   - Mobile (likely no WebGPU): falls back to static layout — confirm no JS errors, no layout shift.

### Open design questions to resolve before / during build

1. **Cross-section cross-fade** — instant snap at section boundary, or smooth lerp using IntersectionObserver progress? Recommend smooth lerp (~600ms ease) so the swarm visibly *moves through* regimes rather than teleporting.
2. **What about "first paint" while WebGPU initializes?** Hero shows static fallback for 50–200ms before canvas takes over. Is that acceptable? If not, render a CSS gradient placeholder matching graphite first.
3. **Mobile / WebGPU-unavailable fallback** — currently falls back to no canvas. Phase 2 should consider a low-cost CSS-only swarm-evocation (e.g. animated splice-line patterns) instead of going fully static, so the brand thesis holds on mobile too. Out of scope unless prioritized.
4. **Material per regime** — keep graphite uniform, or shift toward teal emissive in agent-heavy sections (Helios, Agents)? Recommend graphite-default, emissive intensity uniform crossfades up in Helios + Agents only.
5. **Is regime mapping above approved as-is?** Re-read in fresh context and red-pen before code. The Helios concentric-rings choice in particular is opinionated.

### Risks / gotchas (from Phase-1 scars)

- **Never wire reactive control values into TSL uniforms.** Hardcoded constants only, or a delayed-mount guard. See `feedback_leva_with_webgpu_tsl.md` in memory.
- **Don't import TSL from `three/tsl`.** Always `import { TSL } from "three/webgpu"`. (Functionally equivalent in 0.171, but `three/tsl` is just a re-export of the same namespace and importing it adds a separate bundle entry that confuses vite's pre-bundler.)
- **Don't reintroduce `lovable-tagger`.** Documented in `vite.config.ts`. Wraps JSX in dev — risk of breaking Proxy chains.
- **Don't bump three past 0.171.x without retesting the whole kernel.** 0.184's TSL had API drift that crashed our compute kernel.
- **Drei's `<Environment preset>` JSX is not needed** — `EnvLoader` (using `useEnvironment` directly) feeds `envTex` into the swarm shader. Adding `<Environment preset>` was redundant and triggered cubemap-PNG fallback errors.
- **Multi-instance Vite + r3f + drei is fragile.** Keep `dedupe: ["three", "@react-three/fiber", "@react-three/drei"]` and `optimizeDeps.exclude: ["three", "three/webgpu", "three/tsl"]` in `vite.config.ts`.

---

## 5. Quick-resume checklist (first 5 minutes of next session)

1. `cd /Users/jake/dev/splice-labs/design-exploration/splice-identity-foundry && npm run dev`
2. Visit `localhost:8080/` — should show splice hero with swarm behind copy. If broken, **before changing anything**, read `docs/VERSION_E_SWARM_HANDOFF.md` (this file) and `docs/BRAND_THESIS.md`.
3. Read these files in order:
   - `src/components/marketing/version-e/VersionE.tsx`
   - `src/components/marketing/version-e/HeroSection.tsx`
   - `src/components/marketing/version-e/swarm/SwarmHero.tsx`
   - `src/components/marketing/version-e/swarm/SwarmV7.tsx`
   - `src/lib/swarm/targets.ts`
4. Start Phase 2 at step 1 of the build order (extract `SwarmCanvas`).
5. Confirm regime mapping table with user before extending `SwarmV7` to multi-regime — that table is the load-bearing decision and worth a sanity check.

---

## 6. References

- `docs/BRAND_THESIS.md` — strategic positioning, audiences, decision criteria for any change.
- `demo/src/versions/V7.tsx`, `demo/src/versions/SwarmV7.tsx` — original prototype. Demo runs from `demo/` with `npm run dev`. Use as a sandbox to test kernel changes before porting.
- `~/.claude/projects/-Users-jake-dev-splice-labs-design-exploration/memory/feedback_leva_with_webgpu_tsl.md` — the leva/TSL race learning.
- `~/.claude/projects/-Users-jake-dev-splice-labs-design-exploration/memory/project_splice_labs_positioning.md` — the studio + 3-audience framing.
