import { useState } from 'react';
import useSWR, { preload } from 'swr';

import { API_URL } from '@/constants';
import { ApiResponse, SwrKey, SwrParam } from '@/types/project';

export const fetcher = (url: SwrKey, options?: object) =>
  fetch(url, options).then((res) => {
    if (!res.ok) throw new Error(`API returned code ${res.status}`);
    return res.json();
  });

export const swrPreload = (key: SwrKey) =>
  preload(`${API_URL}/${key}/`, fetcher);

export const useAPI = <T = unknown>(
  key: SwrKey,
  param: SwrParam = '',
): ApiResponse<T> => {
  const [isApiDown, setIsApiDown] = useState(false);
  const { data, error, isLoading, isValidating } = useSWR(
    `${API_URL}/${key}/${param}`,
    fetcher,
    {
      onSuccess: () => setIsApiDown(false),
      onLoadingSlow: () => setIsApiDown(true),
      loadingTimeout: 5000,
      errorRetryInterval: 60000,
    },
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    isApiDown,
  };
};
