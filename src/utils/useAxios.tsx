"use client"
import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from "axios";

const defaultRequestTimeout: number = 60000;

export default function useAxios(baseUrl: string = '') {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: defaultRequestTimeout,
  });

  const makeRequest = useCallback(async (config: AxiosRequestConfig<any>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance(config);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
      throw error;
    }
  }, []);

  const get = useCallback(
    async (url:string, params = {}, config = {}) => {
      return makeRequest({
        method: 'GET',
        url,
        params,
        ...config,
      });
    },
    [makeRequest]
  );

  const post = useCallback(
    async (url:string, data = {}, config = {}) => {
      return makeRequest({
        method: 'POST',
        url,
        data,
        ...config,
      });
    },
    [makeRequest]
  );

  const put = useCallback(
    async (url:string, data = {}, config = {}) => {
      return makeRequest({
        method: 'PUT',
        url,
        data,
        ...config,
      });
    },
    [makeRequest]
  );

  const del = useCallback(
    async (url:string, data = {}, config = {}) => {
      return makeRequest({
        method: 'DELETE',
        url,
        data,
        ...config,
      });
    },
    [makeRequest]
  );

  return { loading, error, get, post, put, del };
}