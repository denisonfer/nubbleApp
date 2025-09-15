import { renderHook, waitFor } from 'test-utils';

import { authServices } from '../../authServices';
import { useAuthSignIn } from '../useAuthSignIn';

import { mockedAuthCredentials } from './mockedData/mocks';

const mockedSaveCredentials = jest.fn();
const mockedService = jest.spyOn(authServices, 'signIn');

jest.mock('@services', () => {
  const originalModule = jest.requireActual('@services');

  return {
    ...originalModule,
    useAuth: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  };
});

describe('useAuthSignIn', () => {
  it('Saves credentials if the sign in is successful', async () => {
    mockedService.mockResolvedValueOnce(mockedAuthCredentials);

    const { result } = renderHook(() => useAuthSignIn());

    result.current.mutate({ email: 'test@test.com', password: '123456' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
  });
  it('Calls onError if the sign in fails', async () => {
    mockedService.mockRejectedValueOnce(new Error('Error'));

    const onError = jest.fn();

    const { result } = renderHook(() => useAuthSignIn({ onError }));

    result.current.mutate({ email: 'test@test.com', password: '123456' });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(onError).toHaveBeenCalledWith(new Error('Error'));
  });
});
