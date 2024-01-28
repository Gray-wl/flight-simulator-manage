import { ACCESS_TOKEN, API_PREFIX } from '@/constants';
import { ResponseStatus } from '@/constants/enum';
import { RequestConfig, history, request } from '@umijs/max';
import { message } from 'antd';

const requestConfig: RequestConfig = {
  timeout: 2000,
  //   errorConfig: {
  //     errorThrower: (res) => {},
  //     errorHandler: (err) => {},
  //   },
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        ACCESS_TOKEN,
      )}`;
      return { ...config };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      const { data } = response || {};
      if (data?.status !== ResponseStatus.Success && data?.message) {
        message.error(data.message);
      }
      return response;
    },
    [
      (response) => response,
      (error: any) => {
        const msg =
          error?.response?.data?.message ??
          error?.response?.message ??
          error?.message;
        if (msg) {
          message.error(msg);
        }
        if (error?.response?.status === ResponseStatus.Unauthorized) {
          history.replace('/login');
        }
        return Promise.reject(error);
      },
    ],
  ],
};

class MyRequest {
  _config: { baseURL: string };
  // 在构造函数中可以设置通用的请求配置
  constructor() {
    this._config = {
      ...requestConfig,
      baseURL: API_PREFIX, // 基本的 API 地址
    };
  }

  async _fetch(url: string, method: string, params?: any): Promise<any> {
    return await request(url, {
      ...this._config,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      ...params,
    });
  }

  // 封装 GET 请求
  async get<T>(url: string, params?: T, ...args: any[]) {
    return await this._fetch(url, 'GET', { params, ...args });
  }

  // 封装 PATCH 请求
  async patch<T>(url: string, params?: T) {
    return await this._fetch(url, 'PATCH', { params });
  }

  // 封装 PUT 请求
  async put<T>(url: string, data?: T) {
    return await this._fetch(url, 'PUT', {
      data,
    });
  }

  // 封装 POST 请求
  async post<T>(url: string, data?: T) {
    return await this._fetch(url, 'POST', {
      data,
    });
  }
}

const myRequest = new MyRequest();

export default myRequest;
