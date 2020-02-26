import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, Spin, Avatar } from 'antd';
import { get } from 'lodash-es';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

interface AccountSettingFormPropsType {
  accountInfo: any,
  onSubmit: (values: any) => void,
  settingBaseLoading: boolean,
}

const AccountBaseSettingForm:React.FC<AccountSettingFormPropsType> = props => {
  const{
    accountInfo,
    onSubmit,
    settingBaseLoading,
  }= props;

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  useEffect(() => {

  });

  return (
    <Row gutter={8}>
      <Col span={10} style={{ minWidth: '224px', maxWidth: '448px' }}>
        {accountInfo && <Form
          onFinish={onFinish}
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 20 }}
          layout="vertical"
          size="middle"
          initialValues={{
            nickname: get(accountInfo, 'nickname', ''),
            motto: get(accountInfo, 'motto', ''),
          }}
        >
          <Form.Item
            label="昵称"
            name="nickname"
            style={{  maxWidth: '380px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="个性签名"
            name="motto"
            style={{  maxWidth: '380px' }}

          >
            <Input.TextArea

            />
          </Form.Item>
          <Form.Item style={{ marginTop: '36px'}}>
            <Button
              type="primary"
              htmlType="submit"
              loading={settingBaseLoading}
            >
              更新基本信息
            </Button>
          </Form.Item>
        </Form>}
      </Col>
      <Col span={12} style={{ marginLeft: '52px'}}>
        <Form
          layout="vertical"
        >
          <Form.Item label="头像" >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '128px' }}>
              <Avatar
                style={{ width: '128px', height: '128px', lineHeight: '128px' }}
                size="large"
                icon={<UserOutlined style={{ fontSize: '64px', lineHeight: '128px'}}/>}
              >
              </Avatar>
              <Button
                style={{ marginTop: '20px' }}
                block={false}
              >
                <UploadOutlined />
                更换头像
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
};

export default AccountBaseSettingForm;
