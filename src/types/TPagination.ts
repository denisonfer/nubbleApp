export type TMetaData = {
  total: number;
  perPage: number;
  firstPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type TPagination<TData> = {
  meta: TMetaData;
  data: TData[];
};
