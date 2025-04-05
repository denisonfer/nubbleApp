import { TMetaData, TPagination } from '@types';
import { renderHook, waitFor } from 'test-utils';

import { usePaginatedList } from '../usePaginatedList';

const page1 = ['item1', 'item2'];
const page2 = ['item3', 'item4'];

const mockedGetList = ({
  page,
}: {
  page: number;
}): Promise<TPagination<string>> => {
  const data = page === 1 ? page1 : page2;

  const meta: TMetaData = {
    currentPage: page,
    firstPage: 1,
    lastPage: 2,
    perPage: 2,
    total: 4,
    hasNextPage: page === 1,
    hasPreviousPage: page === 2,
  };

  return Promise.resolve({ data, meta });
};

describe('usePaginatedList', () => {
  it('should returns all pages together and stops fetching when there is no next page', async () => {
    const { result } = renderHook(() =>
      usePaginatedList(['test'], mockedGetList),
    );

    await waitFor(() => expect(result.current.list).toStrictEqual(page1));

    result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.list).toStrictEqual([...page1, ...page2]),
    );
  });
});
