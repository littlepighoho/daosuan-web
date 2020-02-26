import React from 'react';
// import { CheckCircleOutlined } from '@ant-design/icons';

import {
  Form,
  Input,
  Button,
} from 'antd';


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

interface AccountPasswordSettingFormPayloadType {
  onSubmit: (values: any) => void;
}

const AccountPasswordSettingForm: React.FC<AccountPasswordSettingFormPayloadType> = props => {

  const {
    onSubmit,
  } = props;

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('密码form: ', values);
    onSubmit(values);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    form.scrollToField(errorFields[0].name);
  };

  return (
    <Form
      style={{ width: '300px', marginRight: '75px' }}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="oldPassword"
        label="旧密码"
        rules={[
          {
            required: true,
            message: '请输入旧密码！',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="新密码"
        rules={[
          {
            required: true,
            message: '请输入新密码！',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认新密码"
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入新密码！',
          },
          ({ getFieldValue }: any) => ({
            validator(rule: any, value: any) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('请确认两次新密码一致！');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout} style={{ marginTop: '36px'}}>
        <Button
          style={{ width: '100%' }}
          type="primary"
          htmlType="submit"
          block
        >
          {/*<CheckCircleOutlined />*/}
          确认修改
        </Button>
      </Form.Item>
    </Form>
  )
};

export default AccountPasswordSettingForm;
