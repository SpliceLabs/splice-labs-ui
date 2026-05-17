/**
 * @acme/features — Portable screens and flows.
 *
 * HARD RULES:
 * - NO router imports (no react-router, no next/navigation, no expo-router)
 * - NO DOM intrinsics in shared feature code
 * - Navigation is done via callbacks passed from the app shell
 *
 * For now, this re-exports feature modules.
 * Actual portable screens will be migrated here incrementally.
 *
 * POST-EXPORT: becomes packages/features/
 */

// Feature modules will be added as screens are migrated from
// the existing src/pages/ and src/components/ directories.
//
// Example future exports:
// export { HomeScreen } from "./home/HomeScreen";
// export { LogoComparisonScreen } from "./logos/LogoComparisonScreen";
// export { PitchDeckScreen } from "./deck/PitchDeckScreen";

export {};
