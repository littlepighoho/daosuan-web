import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, Avatar, Upload  } from 'antd';
import { get } from 'lodash-es';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { imageToDataURL } from '@/utils/image_helper';
import { resourceUrl } from '@/utils/resource_helper';

interface AccountSettingFormPropsType {
  accountInfo: any,
  onSubmit: (values: any) => void,
  onSubmitAvatar: (values: string) => void;
  settingBaseLoading: boolean,
  settingAvatarLoading: boolean,
}

const AccountBaseSettingForm:React.FC<AccountSettingFormPropsType> = props => {
  const{
    accountInfo,
    onSubmit,
    settingBaseLoading,
    onSubmitAvatar,
    settingAvatarLoading,
  }= props;

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  useEffect(() => {

  });

  const uploadProps = {
    beforeUpload: (file: any) => {
      imageToDataURL(file, (data) => {
        onSubmitAvatar(data);
      })
    },
    showUploadList: false,
  };

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
                style={{ width: '144px', height: '144px', lineHeight: '144px' }}
                size="large"
                src={resourceUrl(accountInfo.avator)}
                icon={<UserOutlined style={{ fontSize: '64px', lineHeight: '128px'}}/>}
              >
              </Avatar>

              <Upload {...uploadProps as any}>
                <Button
                  style={{ marginTop: '20px' }}
                  block={false}
                  loading={settingAvatarLoading}
                >

                  <UploadOutlined />
                  更换头像
                </Button>
              </Upload>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
};

export default AccountBaseSettingForm;
