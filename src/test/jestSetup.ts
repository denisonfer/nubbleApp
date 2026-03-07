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

// mock react-native-permissions
jest.mock('../services/permission/permissionService', () => ({
  permissionService: {
    request: jest.fn(),
    check: jest.fn(),
  },
}));
