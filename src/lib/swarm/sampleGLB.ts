// GLB → Vector3[] sampling w/ auto-fit + auto-recenter.
//
// Drop-in convention: any GLB referenced from sectionRegimes can be used
// regardless of source-app units or origin. The first Mesh found in the
// scene graph is sampled, recentered to its centroid, and uniformly scaled
// so its bounding-box max-extent / 2 equals fitRadius (default 1.5 — matches
// procedural target generators' visual scale).

import { Box3, Group, Mesh, Vector3 } from "three";
import { sampleMeshSurface } from "./targets";

export type SampleGLBOptions = {
  // Target bounding half-extent after fit. Default 1.5.
  fitRadius?: number;
};

export function sampleGLBScene(
  scene: Group,
  n: number,
  opts?: SampleGLBOptions,
): Vector3[] | null {
  let mesh: Mesh | null = null;
  scene.traverse((o) => {
    if (!mesh && (o as Mesh).isMesh) mesh = o as Mesh;
  });
  if (!mesh) return null;

  // sampleMeshSurface fits to height; we then re-fit to a bounding-box
  // max-extent so non-tall models (wide, deep) are normalized consistently.
  const fitRadius = opts?.fitRadius ?? 1.5;
  const points = sampleMeshSurface(mesh, n, { fitHeight: fitRadius * 2 });

  // Re-center to centroid (sampleMeshSurface centers via bbox center, but
  // for irregular meshes the centroid of sampled points is more stable).
  const centroid = new Vector3();
  for (const p of points) centroid.add(p);
  centroid.multiplyScalar(1 / points.length);
  for (const p of points) p.sub(centroid);

  // Scale so max half-extent = fitRadius. Uses bbox rather than max distance
  // so a few outlier points don't dominate the fit on rigged meshes.
  const box = new Box3();
  for (const p of points) box.expandByPoint(p);
  const size = box.getSize(new Vector3());
  const halfMax = Math.max(size.x, size.y, size.z) * 0.5;
  if (halfMax > 0) {
    const scale = fitRadius / halfMax;
    for (const p of points) p.multiplyScalar(scale);
  }

  return points;
}
