import { ACCESS_TOKEN } from '@/constants';
import { loginout, profile } from '@/services/auth';
import { layoutPage } from '@/utils/utils';
import { history } from '@umijs/max';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

interface InitialState {
  name?: string;
  goLoginout?: () => Promise<void>;
}

// 获取全局初始化数据
export async function getInitialState(): Promise<InitialState> {
  try {
    console.log(12121)
    if (layoutPage()) {
      const goLoginout = async () => {
        await loginout();
        history.replace('/login');
        localStorage.removeItem(ACCESS_TOKEN);
      };

      // 进行异步操作，例如获取用户信息
      const res = await profile();

      // 返回全局初始化数据
      return {
        name: res?.data?.username,
        goLoginout,
      };
    }
    return {};
  } catch (error) {
    // 处理异常
    console.error('Error fetching user data:', error);
    return {};
  }
}

export const layout = ({ initialState }: { initialState?: InitialState }) => {
  const { goLoginout } = initialState || {};

  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    logout: goLoginout,
  };
};
