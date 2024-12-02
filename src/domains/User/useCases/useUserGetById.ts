import { useQuery } from '@tanstack/react-query';

import { EQueryKeys } from '@infra';

import { userServices } from '../userServices';

export function useUserGetById(userId: number) {
  /*   const [loading, setLoading] = useState(false);
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
  }, [userId]); */

  const {
    data: user,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: [EQueryKeys.UserGetById, userId],
    queryFn: () => userServices.getById(userId),
  });

  return { user, loading, error };
}
