# Mobile Shell Notes (React Native / Expo)

## Purpose
This document describes the future `apps/mobile-expo/` shell that will be created for the mobile application.

## What It Will Contain

### Directory Structure
```
apps/mobile-expo/
├── app/
│   ├── _layout.tsx              # Root layout (providers, navigation)
│   ├── index.tsx                # Home screen → @acme/features
│   ├── logos.tsx                 # Logo comparison → @acme/features
│   └── decks.tsx                # Pitch decks → @acme/features
├── platform/
│   ├── storage.ts               # AsyncStorage adapter → @acme/platform
│   ├── secure-storage.ts        # expo-secure-store adapter → @acme/platform
│   └── device.ts                # Device info adapter → @acme/platform
├── app.json
├── metro.config.js
├── tailwind.config.ts           # NativeWind config
└── tsconfig.json
```

### Key Principles
1. **Thin shell**: Route files only wire `@acme/features` screens to Expo Router routes
2. **Platform adapters**: Implement `@acme/platform` interfaces with native modules
3. **Same imports**: Uses identical `@acme/*` path aliases
4. **No DOM**: `@acme/ui` and `@acme/features` must be DOM-free for this to work
5. **NativeWind**: Tailwind classes mapped to React Native styles

### Platform Adapter Implementations
```typescript
// storage.ts — implements @acme/platform StorageAdapter
import AsyncStorage from '@react-native-async-storage/async-storage';
export const mobileStorageAdapter: StorageAdapter = {
  getItem: (key) => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  removeItem: (key) => AsyncStorage.removeItem(key),
};

// secure-storage.ts — implements @acme/platform SecureStorageAdapter
import * as SecureStore from 'expo-secure-store';
export const mobileSecureStorageAdapter: SecureStorageAdapter = {
  getItem: (key) => SecureStore.getItemAsync(key),
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};
```

### Prerequisites Before Creating This Shell
- [ ] `@acme/ui` must have universal primitives (Tamagui or React Native compatible)
- [ ] `@acme/features` screens must be DOM-free
- [ ] `@acme/api-client` must work in React Native runtime
- [ ] Platform adapters defined and tested

### Dependencies
- Expo SDK 50+
- Expo Router
- NativeWind (Tailwind for RN)
- Tamagui or equivalent universal UI library
- `@react-native-async-storage/async-storage`
- `expo-secure-store`
