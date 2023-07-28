import axios from 'axios';
import useSWR, { preload } from 'swr';

import { API_URL } from '@/constants';

export type SwrKey =
  | 'pilots'
  | 'teams'
  | 'judges'
  | 'competitions'
  | 'seasons'
  | 'tricks';

type civlid = string | number;
type code = string;
type id = string | number;

export type SwrParam = civlid | code | id;

export type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isValidating: boolean;
  // isApiDown: boolean;
};

export const fetcher = (url: SwrKey, options?: object) =>
  axios
    .get(url, options)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

export const swrPreload = (key: SwrKey) =>
  preload(`${API_URL}/${key}/`, fetcher);

export const useAPI = <T>(
  key: SwrKey,
  param: SwrParam = '',
): ApiResponse<T> => {
  const { data, isLoading, error, isValidating } = useSWR(
    `${API_URL}/${key}/${param}`,
    fetcher,
    // {
    //   onSuccess: () => {},
    //   onError: (error) => {
    //     error;
    //   },
    // },
  );

  // useEffect(() => {
  //   setIsApiUpdating(isValidating);
  //   if (isValidating) {
  //     const checkSleeping = setTimeout(() => {
  //       if (!data) {
  //         setIsApiSleeping(true);
  //         const retryAfterSleep = setTimeout(() => {
  //           if (!data && !error) {
  //             setIsApiDown(true);
  //           }
  //         }, 40000);
  //         return () => clearTimeout(retryAfterSleep);
  //       }
  //     }, 5000);
  //     return () => clearTimeout(checkSleeping);
  //   }
  // }, [
  //   isValidating,
  //   data,
  //   setIsApiUpdating,
  //   setIsApiSleeping,
  //   setIsApiDown,
  //   error,
  // ]);

  return {
    data,
    isLoading,
    error,
    isValidating,
  };
};
