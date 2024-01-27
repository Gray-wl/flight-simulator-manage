import { AUTH_V1 } from '@/constants';
import request from '@/utils/request';

// 登录
export const login = async (params: LoginParams) =>
  request.post(`${AUTH_V1}/login`, params);

// 登出
export const loginout = async () => request.post(`${AUTH_V1}/loginout`);

// 查询信息
export const profile = async () => request.get(`${AUTH_V1}/profile`);
