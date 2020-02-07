
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import'./index.scss';
import router from 'umi/router';


interface LoginFormPropsType {
  onLogin: (values: any) => void
  loginLoading: boolean
}

const LoginForm:React.FC<LoginFormPropsType> = props => {

  const {
    onLogin,
    loginLoading,
  } = props;

  const onFinish = (values: any) => {
    console.log('login-form data: ', values);
    onLogin(values);
  };

  return (
    <Form
      name="login_form"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入账户!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          // size="large"

          placeholder="账户" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          // size="large"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loginLoading}>
          登录
        </Button>
        <div style={{marginTop: '8px'}}>
          或者
          <a href="" onClick={() => router.push('/register')}>马上加入我们！</a>

        </div>
      </Form.Item>
    </Form>
  );
};


export default LoginForm;
