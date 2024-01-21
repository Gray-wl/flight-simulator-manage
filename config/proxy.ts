import { API_PREFIX } from '../src/constants';

export default {
  [API_PREFIX]: {
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
      [`^${API_PREFIX}`]: '',
    },
  },
};
