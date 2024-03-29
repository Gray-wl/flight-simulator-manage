import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  antd: {
    configProvider: {
      prefixCls: 'antflight',
      iconPrefixCls: 'antflighticon',
    },
  },
  access: {},
  model: {},
  initialState: {},
  proxy,
  request: {},
  layout: {
    title: '飞升模拟器后台',
    locale: false,
  },
  routes,
  base: '/manage/',
  publicPath: '/manage/',
  npmClient: 'pnpm',
  tailwindcss: {},
});
