import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@theme';

import { renderHook } from 'test-utils';

import { useAppSafeArea } from '../useAppSafeArea';

jest.mock('react-native-safe-area-context');
const mockedUseSafeAreaInsets = jest.mocked(useSafeAreaInsets);

describe('useAppSafeArea', () => {
  test('When the safe area is less than minimum required, it returns the minimum required', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () =>
        ({
          top: 4,
          bottom: 4,
        } as EdgeInsets),
    );

    const { result } = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(theme.spacing.spc24);
    expect(result.current.bottom).toEqual(theme.spacing.spc24);
  });

  test('When the safe area is greater than minimum required, it returns the safe area', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () =>
        ({
          top: 100,
          bottom: 100,
        } as EdgeInsets),
    );

    const { result } = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(100);
    expect(result.current.bottom).toEqual(100);
  });
});
