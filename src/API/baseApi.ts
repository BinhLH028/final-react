import api from "./axios";
import type { AxiosRequestConfig, Method } from "axios";

type BaseApiCallOptions = {
  method: Method;
  url: string;
  params?: Record<string, any>;    // Query string params
  data?: any;                      // POST/PUT/PATCH body
  headers?: Record<string, string>;
  pathParams?: Record<string, string | number>;
};

// Utility to replace :param in URL with pathParams
const formatUrl = (url: string, pathParams?: Record<string, string | number>) => {
  if (!pathParams) return url;
  return url.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => encodeURIComponent(pathParams[key]));
};

// Generic API call function
export async function baseApiCall<T = any>({
  method,
  url,
  params,
  data,
  headers,
  pathParams,
}: BaseApiCallOptions): Promise<T> {
  const formattedUrl = formatUrl(url, pathParams);

  const config: AxiosRequestConfig = {
    method,
    url: formattedUrl,
    params,
    data,
    headers,
  };

  const response = await api.request<T>(config);
  return response.data;
}