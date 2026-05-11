/**
 * @acme/platform — Platform adapters for storage, device info, etc.
 * Provides a unified interface that each platform (web, RN) implements.
 *
 * POST-EXPORT: becomes packages/platform/
 */

// ─── Storage Adapter ────────────────────────────────────────────────

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

/**
 * Web localStorage adapter (default for Vite shell).
 * React Native will provide AsyncStorage adapter.
 */
export const webStorageAdapter: StorageAdapter = {
  getItem: async (key) => localStorage.getItem(key),
  setItem: async (key, value) => localStorage.setItem(key, value),
  removeItem: async (key) => localStorage.removeItem(key),
};

// ─── Secure Storage Adapter (stub) ──────────────────────────────────

export interface SecureStorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// Web: no true secure storage; use regular storage with warning
export const webSecureStorageAdapter: SecureStorageAdapter = {
  getItem: async (key) => {
    console.warn("[platform] Web has no secure storage; using localStorage");
    return localStorage.getItem(key);
  },
  setItem: async (key, value) => {
    console.warn("[platform] Web has no secure storage; using localStorage");
    localStorage.setItem(key, value);
  },
  removeItem: async (key) => localStorage.removeItem(key),
};

// ─── Device Info ────────────────────────────────────────────────────

export interface DeviceInfo {
  platform: "web" | "ios" | "android";
  isTouch: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

export function getWebDeviceInfo(): DeviceInfo {
  return {
    platform: "web",
    isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };
}
