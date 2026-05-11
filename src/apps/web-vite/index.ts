/**
 * src/apps/web-vite/ — Vite app shell.
 * This is GLUE code only: router setup, route→component mapping, providers.
 * 
 * This is the ONLY place that may import react-router-dom.
 * All domain logic, API calls, and portable UI live in src/packages/*.
 *
 * POST-EXPORT: becomes apps/web-vite/
 */

// Re-export the app entry for main.tsx to use
export { default as App } from "../../App";
