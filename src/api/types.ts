export interface IMetaApi {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
}

/**
 * @description Interface that defines the format of a page of API data.
 * @template Data The type of data contained in the page.
 */
export interface IApiPaginated<TData> {
  meta: IMetaApi;
  data: TData[];
}

export interface IPageParams {
  page?: number;
  per_page?: number;
}
