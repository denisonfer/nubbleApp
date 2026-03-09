export {};

import mockSafeAreContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreContext);


// mock useNavigation
jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// mock react-native-vision-camera (no native module in Jest)
jest.mock('react-native-vision-camera', () => {
  const { View } = jest.requireActual('react-native');
  return {
    Camera: View,
    useCameraDevice: jest.fn(() => undefined),
    useCameraPermission: jest.fn(() => ({ hasPermission: true })),
  };
});

// mock camera roll
jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: {
    getPhotos: jest.fn(async () => ({
      edges: [
        { node: { image: { uri: 'image 1' } } },
        { node: { image: { uri: 'image 2' } } },
        { node: { image: { uri: 'image 3' } } },
      ],
    })),
  },
}));

// mock expo-image-manipulator (no native module in Jest)
jest.mock('expo-image-manipulator', () => ({
  ImageManipulator: {
    manipulate: jest.fn(() => ({
      renderAsync: jest.fn(async () => ({
        saveAsync: jest.fn(async () => ({
          uri: 'mocked-image-uri',
        })),
      })),
    })),
  },
  SaveFormat: {
    JPEG: 'jpeg',
    PNG: 'png',
    WEBP: 'webp',
  },
}));

// mock react-native-permissions
jest.mock('../services/permission/permissionService', () => ({
  permissionService: {
    request: jest.fn(),
    check: jest.fn(),
  },
}));

// Mock storage for Zustand persist (avoids MMKV in Jest, applies to all tests)
const mockStorageStore = new Map<string, string>();
const mockStorage = {
  getItem: (name: string) => mockStorageStore.get(name) ?? null,
  setItem: (name: string, value: string) => mockStorageStore.set(name, value),
  removeItem: (name: string) => mockStorageStore.delete(name),
  getAllKeys: () => Promise.resolve(Array.from(mockStorageStore.keys())),
};

jest.mock('../services/storage/storage', () => ({
  storage: mockStorage,
  initStorage: jest.fn(),
}));

jest.mock('@services', () => {
  const actual = jest.requireActual<typeof import('@services')>('@services');
  return { ...actual, storage: mockStorage };
});
