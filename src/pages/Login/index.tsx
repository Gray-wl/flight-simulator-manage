import { getInitialState } from '@/app';
import { ACCESS_TOKEN } from '@/constants';
import { login } from '@/services/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import { useCallback, useState } from 'react';

const LoginPage = () => {
  const [loading, setloading] = useState(false);

  const onLogin = useCallback(async (values: LoginParams) => {
    try {
      setloading(true);
      const res = await login(values);
      localStorage.setItem(ACCESS_TOKEN, res?.data?.access_token);
      message.success('登录成功！');
      history.push('/');
      await getInitialState();
    } finally {
      setloading(false);
    }
  }, []);

  return (
    <div className="h-lvh">
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        title="飞升模拟器"
        subTitle="全球最nice的平台"
        actions={null}
        loading={loading}
        onFinish={onLogin}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
            maxLength: 20,
          }}
          placeholder={'请输入用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
            maxLength: 100,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginFormPage>
    </div>
  );
};

export default LoginPage;
