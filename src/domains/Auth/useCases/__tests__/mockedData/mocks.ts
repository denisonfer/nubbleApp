import { TAuth } from 'src/domains/Auth/authTypes';

export const mockedAuthCredentials: TAuth = {
  auth: {
    token: 'accessToken',
    refreshToken: 'refreshToken',
    expiresAt: '2025-03-17T10:00:00.000Z',
  },
  user: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    userName: 'john.doe',
    email: 'john.doe@example.com',
    profileUrl: 'https://example.com/avatar.png',
    isOnline: true,
    fullName: 'John Doe',
  },
};
