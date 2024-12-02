import { useEffect, useState } from 'react';

import { userServices } from '../userServices';
import { TUser } from '../userTypes';

export function useUserGetById(userId: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [user, setUser] = useState<TUser>();

  async function getById() {
    setLoading(true);
    setError(undefined);

    try {
      const response = await userServices.getById(userId);
      setUser(response);
    } catch (error) {
      console.error('getById - ERROR: ', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getById();
  }, [userId]);

  return { getById, loading, error, user };
}
