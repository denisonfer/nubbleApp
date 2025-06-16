import { EQueryKeys, usePaginatedList } from '@infra';
import { userServices } from '../userServices';

export function useUserSearch(search: string) {
  return usePaginatedList(
    [EQueryKeys.UserList, search],
    () => userServices.searchUser(search),
    { enabled: search.length > 2 },
  );
}
