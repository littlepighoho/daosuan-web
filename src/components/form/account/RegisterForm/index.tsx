import React, { useState } from 'react';
import { get } from 'lodash-es';
import { SendOutlined } from '@ant-design/icons';

import {
  Form,
  Input,
  Tooltip,
  Button,
  Statistic,
} from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Countdown } = Statistic;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface RegisterFormPropsType {
  onSubmit: (values: any) => void,
  onCheckNickname: (nickname: string) => void,
  registerLoading: boolean,
  checkNickname: boolean,
  onSendEmail: (email: string) => void,
}

const RegisterForm: React.FC<RegisterFormPropsType> = props => {

  const {
    onSubmit,
    onCheckNickname,
    registerLoading,
    checkNickname,
    onSendEmail,
  } = props;
  const [hasSendEmail, setHasSendEmail] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('注册form: ', values);
    onSubmit(values);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    form.scrollToField(errorFields[0].name);
  };

  const debounce = (function() {
    let timer: null | number | any;
    return function(fn: Function) {
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        fn();
      }, 300)
    }
  })();

  const onValuesChange = (changedValues: any) => {
    if(get(changedValues, 'nickname', null)) {
      const { nickname } = changedValues;
      if(nickname !== "") {
        debounce(function () {
          onCheckNickname(nickname)
        });
      }
    }
  };

  const handleSendEmail = () => {
    if( (form.getFieldValue('email') !== '') && (form.getFieldValue('email') !== undefined)) {
      if((form.getFieldError('email')[0] !== "你输入的不是邮箱！")) {
        onSendEmail(form.getFieldValue('email'));
        setHasSendEmail(true)
      }
    } else {
      form.validateFields(['email']);
    }
  };
  return (
    // @ts-ignore
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={onValuesChange}
    >
      {/*@ts-ignore*/}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: '你输入的不是邮箱！',
          },
          {
            required: true,
            message: '请输入你的邮箱！',
          },
        ]}
      >

        <Search
          // loading={false}
          onSearch={handleSendEmail}
          enterButton={
            hasSendEmail ?  <Countdown
                value={Date.now() + 60000}
                format="ss"
                valueStyle={{color: "white", fontSize: "14px"}}
                onFinish={() => setHasSendEmail(false)}
              />
              :<SendOutlined />

        }/>
      </Form.Item>
      <Form.Item
        name="token"
        label="验证码"
        rules={[
          {
            required: true,
            message: '请输入邮件中的验证码！'
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        shouldUpdate
        validateTrigger={['onChange', 'onBlur']}
        name="nickname"
        label={
          <span>
            昵称&nbsp;
            <Tooltip title="社区里其他人看到的名字">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          { required: true, message: '请输入昵称！!', whitespace: true },
          () => ({
            validator(rule: any, value: any) {
              if(value !== '') {
                if(!checkNickname) {
                  return Promise.resolve();
                }
                return Promise.reject('该昵称已有人使用！');
              }
              return Promise.resolve();
            }
          })
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入密码！',
          },
          ({ getFieldValue }: any) => ({
            validator(rule: any, value: any) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('请确认两次密码一致！');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout} style={{ marginTop: '36px'}}>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={registerLoading}
        >
          马上加入
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
