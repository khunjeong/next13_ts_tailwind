import axios, { AxiosError, AxiosResponse } from 'axios';

import { IApiErrorModel } from '@/types/global';

const LOCAL_API_URL = 'http://localhost:3000';

export const instance = axios.create({
  baseURL: LOCAL_API_URL,
  withCredentials: true,
  timeout: 15000,
});

// Response interceptor
function interceptorResponseFulfilled<T>(res: AxiosResponse<T>) {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }
  return Promise.reject(res.data);
}

function interceptorResponseRejected(error: AxiosError<IApiErrorModel>) {
  return Promise.reject(error);
}

instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
