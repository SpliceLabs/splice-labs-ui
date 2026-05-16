/* eslint-disable @typescript-eslint/no-explicit-any */
// PBR fragment-color builder for the fluid morph mesh. Shading uses a flat
// face normal computed from world-position screen derivatives (dFdx/dFdy)
// → robust under any vertex morph without precomputed-normal artifacts.
//
// Two env samplers provided:
//   - equirectEnvSampler(envTex): equirect texture lookup (FluidV3 default)
//   - hemisphereEnvSampler():     procedural sky/ground (V6/V7 swarm friendly)
//
// Caller picks one and passes to buildFluidPBR.

import { Color, Texture } from "three";
// See morphMesh.ts header comment — TSL must come from three/webgpu so all
// TSL nodes register against the same WebGPU NodeBuilder instance.
import { TSL } from "three/webgpu";

const Fn = TSL.Fn as any;
const uniform = TSL.uniform as any;
const tex = TSL.texture as any;
const vec2 = TSL.vec2 as any;
const vec3 = TSL.vec3 as any;
const vec4 = TSL.vec4 as any;
const float = TSL.float as any;
const mix = TSL.mix as any;
const clamp = TSL.clamp as any;
const dot = TSL.dot as any;
const cross = TSL.cross as any;
const normalize = TSL.normalize as any;
const max = TSL.max as any;
const asin = TSL.asin as any;
const atan2 = (TSL as any).atan2 ?? (TSL as any).atan;
const pow = TSL.pow as any;
const sign = TSL.sign as any;
const reflect = TSL.reflect as any;
const cameraPosition = TSL.cameraPosition as any;
const positionWorld = TSL.positionWorld as any;
const dFdx = (TSL as any).dFdx;
const dFdy = (TSL as any).dFdy;

// (dir, roughness, intensity) → vec3 RGB sample.
export type EnvSampler = (dir: any, roughness: any, intensity: any) => any;

// Equirect texture sampler. Adds roughness blur via lerp toward luminance
// midpoint (cheap stand-in for proper mip prefilter).
export function equirectEnvSampler(envTex: Texture): EnvSampler {
  const dirToEquirect = Fn(([d]: any) => {
    return vec2(
      atan2(d.z, d.x).mul(0.15915494).add(0.5),
      asin(clamp(d.y, float(-1), float(1))).mul(0.31830989).add(0.5),
    );
  });

  return (d: any, roughness: any, intensity: any) => {
    const uv = dirToEquirect(d);
    const sharp = tex(envTex, uv).rgb;
    const lum = dot(sharp, vec3(0.2126, 0.7152, 0.0722));
    const t = clamp(roughness, float(0), float(1));
    return mix(sharp, vec3(lum, lum, lum), t.mul(t)).mul(intensity);
  };
}

// Procedural hemisphere sky + sun. No texture dependency.
export function hemisphereEnvSampler(): EnvSampler {
  return (d: any, roughness: any, intensity: any) => {
    const skyT = clamp(d.y.mul(0.5).add(0.5), float(0), float(1));
    const sky = vec3(0.95, 0.97, 1.0);
    const ground = vec3(0.18, 0.2, 0.24);
    const hemi = mix(ground, sky, skyT);
    const midtone = vec3(0.5, 0.5, 0.55);
    const t = clamp(roughness, float(0), float(1));
    const hemiBlur = mix(hemi, midtone, t.mul(t));
    const sunDir = normalize(vec3(0.4, 0.7, 0.5));
    const sunDot = max(dot(d, sunDir), float(0));
    const sun = vec3(1.2, 1.05, 0.85).mul(pow(sunDot, float(48)));
    return hemiBlur.add(sun).mul(intensity);
  };
}

// ACES tonemap (cheap film-curve approximation).
const aces = Fn(([x]: any) => {
  const a = float(2.51);
  const b = float(0.03);
  const c = float(2.43);
  const d = float(0.59);
  const e = float(0.14);
  return clamp(
    x.mul(a.mul(x).add(b)).div(x.mul(c.mul(x).add(d)).add(e)),
    vec3(0, 0, 0),
    vec3(1, 1, 1),
  );
});

// ---------- PBR builder ----------

export type PBRInit = {
  color?: string;
  metalness?: number;
  roughness?: number;
  exposure?: number;
  envIntensity?: number;
  emissiveColor?: string;
  emissiveIntensity?: number;
  // Activity ramp = per-particle distance(pos, currentTarget). Below
  // emissiveActivityMin = in-formation (no glow); above max = full glow.
  // Distance-based instead of velocity-based so rotating/orbital regimes
  // don't falsely glow when particles are simply co-rotating with their
  // formation.
  emissiveActivityMin?: number;
  emissiveActivityMax?: number;
};

export type PBRUniforms = {
  uColor: any;
  uMetalness: any;
  uRoughness: any;
  uExposure: any;
  uEnvIntensity: any;
  uEmissiveColor: any;
  uEmissiveIntensity: any;
  uEmissiveActivityMin: any;
  uEmissiveActivityMax: any;
  // Per-regime sun-style tint. Engine writes these when the active section
  // has a `tint` config; otherwise uTintActive stays at 0 and the tint
  // contribution drops out entirely. Fragment shader needs a per-particle
  // distance scalar to know which particles fall inside the radius.
  uTintColor: any;
  uTintRadius: any;
  uTintActive: any;
  // Sun-style additive emission. Reuses the same per-particle xz-distance
  // signal as tint. Particles within `uSunRadius` are the "core" (tint
  // colors them); particles outside still receive a smooth illumination
  // spill via 1/(1+falloff·d²). uSunIntensity=0 ⇒ contribution zero.
  uSunColor: any;
  uSunRadius: any;
  uSunIntensity: any;
  uSunFalloff: any;
  uSunActive: any;
  // Per-regime cube cage color. Classifier is per-particle box-max of the
  // current target: particles whose target lies on/near the cube shell
  // (max(|x|,|y|,|z|) > uCageThreshold) get mixed toward uCageColor.
  // uCageActive in 0..1 scales the whole contribution.
  uCageColor: any;
  uCageThreshold: any;
  uCageActive: any;
};

export type PBRNodes = {
  // Plug into mat.colorNode directly.
  colorNode: any;
  uniforms: PBRUniforms;
};

const D = <T,>(v: T | undefined, fallback: T): T =>
  v === undefined ? fallback : v;

// Build PBR uniforms once. Sharing one uniform set across N colorNodes (one
// per shape mesh) means a single `uEmissiveIntensity.value = …` write hits
// every shape — and the engine's per-frame material lerp doesn't have to
// fan out to per-shape uniform tables.
export function buildFluidPBRUniforms(init: PBRInit = {}): PBRUniforms {
  return {
    uColor: uniform(new Color(D(init.color, "#cfcfcf"))),
    uMetalness: uniform(D(init.metalness, 1.0)),
    uRoughness: uniform(D(init.roughness, 0.08)),
    uExposure: uniform(D(init.exposure, 1.0)),
    uEnvIntensity: uniform(D(init.envIntensity, 1.5)),
    uEmissiveColor: uniform(new Color(D(init.emissiveColor, "#00D6A4"))),
    uEmissiveIntensity: uniform(D(init.emissiveIntensity, 0.0)),
    // Steady-state dead zone: boids steering + orbital lag produces
    // ~0.05–0.25 unit jitter per particle. Below 0.25 reads as "in
    // formation" — no glow. Matches the engine's freeStorage threshold
    // so emissive + boids settle detection use the same boundary.
    uEmissiveActivityMin: uniform(D(init.emissiveActivityMin, 0.25)),
    uEmissiveActivityMax: uniform(D(init.emissiveActivityMax, 0.65)),
    // Tint defaults: invisible (active=0) with a 0 radius so the spatial
    // check fails too. Engine overwrites these when a regime declares
    // `tint`.
    uTintColor: uniform(new Color("#ffffff")),
    uTintRadius: uniform(0),
    uTintActive: uniform(0),
    // Sun-emission defaults: black + zero intensity ⇒ contribution drops
    // out entirely even if uSunActive is nonzero. Engine overwrites when a
    // regime declares `sunEmission`.
    uSunColor: uniform(new Color("#000000")),
    uSunRadius: uniform(0),
    uSunIntensity: uniform(0),
    uSunFalloff: uniform(1),
    uSunActive: uniform(0),
    // Cage defaults: invisible (active=0), threshold large so the classifier
    // fails for any normal regime target. Engine overwrites when the active
    // regime's source declares a `cage`.
    uCageColor: uniform(new Color("#FFB800")),
    uCageThreshold: uniform(99),
    uCageActive: uniform(0),
  };
}

// `emissiveActivity` is an optional scalar TSL node (already vertex-stage or
// `varying()`-wrapped) representing per-particle distance from the current
// target. Resting in formation reads ≈ 0 even when the formation rotates,
// so orbital/DNA regimes don't falsely glow. Caller is responsible for
// indexing the right slot — fragment-stage `instancedArray` reads + per-
// shape baseOffset together would otherwise mis-index.
// Pre-tonemap additive emissive: aces shapes the highlight + gamma rolls off.
export function buildFluidPBRColorNode(
  envSampler: EnvSampler,
  u: PBRUniforms,
  emissiveActivity?: any,
  tintDistance?: any,
  tgtBoxMax?: any,
): any {
  return Fn(() => {
    // Flat normal from world-position derivatives. Always matches the
    // currently rendered triangle, so morph distortion can't break shading.
    const N0 = normalize(cross(dFdx(positionWorld), dFdy(positionWorld)));
    const V = normalize(cameraPosition.sub(positionWorld));
    const N = N0.mul(sign(dot(N0, V)));
    const R = reflect(V.negate(), N);
    const env = envSampler(R, u.uRoughness, u.uEnvIntensity);
    const ndv = max(dot(N, V), float(0));
    const fres = pow(float(1).sub(ndv), float(5));
    const F0 = mix(vec3(0.04, 0.04, 0.04), u.uColor, u.uMetalness);
    const F = F0.add(vec3(1, 1, 1).sub(F0).mul(fres));
    const lit = env.mul(F).mul(u.uExposure);

    let preTone = lit;
    if (emissiveActivity !== undefined) {
      const range = max(
        u.uEmissiveActivityMax.sub(u.uEmissiveActivityMin),
        float(0.0001),
      );
      const t = clamp(
        emissiveActivity.sub(u.uEmissiveActivityMin).div(range),
        float(0),
        float(1),
      );
      const emissive = u.uEmissiveColor.mul(t).mul(u.uEmissiveIntensity);
      preTone = lit.add(emissive);
    }

    // Shader-side per-particle tint. The classifier is a regime-supplied
    // radius around the rotation center (xz-plane): particles inside the
    // radius read tintAmt > 0, outside read 0. Soft falloff over the inner
    // 25% of the radius keeps the edge from looking like a sharp circle.
    // uTintActive (engine-controlled, lerped during transit) scales the
    // whole contribution so the tint can fade in/out without snapping.
    if (tintDistance !== undefined) {
      const r = max(u.uTintRadius, float(0.0001));
      const inside = clamp(
        float(1).sub(tintDistance.div(r)).mul(float(4)),
        float(0),
        float(1),
      );
      const tintAmt = inside.mul(u.uTintActive);
      preTone = mix(preTone, u.uTintColor, tintAmt);

      // Sun emission. Same xz-distance signal as the tint classifier
      // (smooth falloff outside the core), but with TWO additional twists
      // for realism:
      //   1. Directional. The flat normal `N` computed above (already
      //      camera-facing) lets us do a lambertian dot against the
      //      sun direction. Particles whose visible face points AT the
      //      sun glow; particles facing away stay dark. This is the
      //      near-side/far-side asymmetry the old uniform-additive term
      //      was missing.
      //   2. Sun particles themselves emit isotropically. They ARE the
      //      light source — making their backs dark would be wrong. The
      //      same `inside` weight that drives tint blending also drives
      //      a mix between (ndotl) for ring particles and (1) for the
      //      core. Smooth transition for free.
      // Sun is at the origin for now; if we ever offset it, swap the
      // negate() for `sunCenter.sub(positionWorld)` and add a sunCenter
      // uniform.
      const sunDir = normalize(positionWorld.negate());
      const ndotl = max(dot(N, sunDir), float(0));
      const dirTerm = mix(ndotl, float(1), inside);
      const d2 = tintDistance.mul(tintDistance);
      const falloff = float(1).div(float(1).add(d2.mul(u.uSunFalloff)));
      const emit = u.uSunColor
        .mul(u.uSunIntensity)
        .mul(falloff)
        .mul(dirTerm)
        .mul(u.uSunActive);
      preTone = preTone.add(emit);
    }

    // Cube-cage classifier. tgtBoxMax = max(|tgt.x|,|tgt.y|,|tgt.z|) of the
    // current blended target — cage particles sit at ±halfExtent on at
    // least one axis (read ~halfExtent), bird particles bounded by
    // ~fitRadius < halfExtent. Linear ramp over a 0.1-unit transition
    // softens the boundary so transit-through-cloud doesn't pop.
    if (tgtBoxMax !== undefined) {
      const cageMask = clamp(
        tgtBoxMax.sub(u.uCageThreshold).mul(float(10)),
        float(0),
        float(1),
      );
      const cageAmt = cageMask.mul(u.uCageActive);
      preTone = mix(preTone, u.uCageColor, cageAmt);
    }

    const col1 = aces(preTone);
    const col2 = pow(col1, vec3(1 / 2.2, 1 / 2.2, 1 / 2.2));
    return vec4(col2, 1.0);
  })();
}

// Back-compat wrapper. Builds one uniform set + one colorNode in lockstep.
// New callers (SwarmV7) use the split functions to share uniforms across
// per-shape colorNodes.
export function buildFluidPBR(
  envSampler: EnvSampler,
  init: PBRInit = {},
  emissiveActivity?: any,
): PBRNodes {
  const uniforms = buildFluidPBRUniforms(init);
  const colorNode = buildFluidPBRColorNode(
    envSampler,
    uniforms,
    emissiveActivity,
  );
  return { colorNode, uniforms };
}

// Convenience: PBR builder using the procedural hemisphere sky.
// V6/V7 swarm contexts use this variant (no env texture loaded).
export function buildFluidPBRHemisphere(init: PBRInit = {}): PBRNodes {
  return buildFluidPBR(hemisphereEnvSampler(), init);
}
