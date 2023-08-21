import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import axios from 'redaxios';

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);
  return [state, toggle];
};

export const useAllQuery = <T>(
  url: string,
  queryKey: unknown[]
): UseQueryResult<T, Error> => {
  const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
  const fetchData = async () => {
    const { data } = await instance.get(url);
    return data;
  };
  return useQuery<T, Error>({
    queryKey,
    queryFn: fetchData,
    useErrorBoundary: (error) => error?.response?.status >= 500,
  });
};
