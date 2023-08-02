/* eslint-disable-next-line simple-import-sort/imports */
import { API_URL } from '@constants';
import { apiStatusAtom, store } from '@state';
import axios from 'axios';
import useSWR, { SWRConfiguration, preload } from 'swr';

export type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isValidating: boolean;
};

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const swrPreload = (key: string) => preload(`${API_URL}/${key}/`, fetcher);

export const useAPI = <T>(slug: string, options?: SWRConfiguration): ApiResponse<T> => {
  let [key, param] = slug.split('/');

  param = param === 'undefined' ? '' : param;

  const { data, isLoading, error, isValidating } = useSWR(
    `${API_URL}/${key}/${param ?? ''}`,
    fetcher,
    {
      ...options,
      onSuccess: () => store.set(apiStatusAtom, 'up'),
    },
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
  };
};
