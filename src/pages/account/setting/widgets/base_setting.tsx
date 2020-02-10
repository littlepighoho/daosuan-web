import React from 'react';
import { Spin, Typography } from 'antd';
import AccountBaseSettingForm from '@/layouts/components/form/AccountBaseSettingForm';

const { Title } = Typography;

// 基本信息
interface BaseSettingPropsType {
  accountInfo: any,
  onBaseSubmit: (values: any) => void;
  settingBaseLoading: boolean,
}
const BaseSetting:React.FC<BaseSettingPropsType> = props => {
  const {
    accountInfo,
    onBaseSubmit,
    settingBaseLoading,
  } = props;
  return (
    <React.Fragment>
      <Title level={3}>
        基本设置
      </Title>
      <Spin spinning={!accountInfo}>
        <AccountBaseSettingForm
          accountInfo={accountInfo}
          onSubmit={onBaseSubmit}
          settingBaseLoading={settingBaseLoading}
        />
      </Spin>
    </React.Fragment>
  )
};

export default BaseSetting;
