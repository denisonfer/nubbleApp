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
