import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import './setting_view.scss';
import { accountSelector } from '@/selector/account';
import { MODELS_KEYS } from '@/constant/models_keys';
import SafeSetting from '@/pages/account/setting/widgets/safe_setting';
import BaseSetting from '@/pages/account/setting/widgets/base_setting';

interface SettingViewPropsType {
  accountInfo: any,
  settingBaseLoading: boolean,
  dispatch: Dispatch<AnyAction>
}
// 个人设置
const SettingView: React.FC<SettingViewPropsType> = props => {
  const {
    accountInfo,
    dispatch,
    settingBaseLoading,
  } = props;

  const [ selectedKey, setSelectedKey] = useState('base');

  const onBaseSubmit = (values: any) => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.SETTING_BASE,
      payload: {
        nickname: values.nickname,
        motto: values.motto,
        accountId: accountInfo.id
      }
    });
    console.log(values);
  };

  return (
    <div className="setting_view">
      <div className="setting_body">
        <Menu
          mode="inline"
          className="setting_sider"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item
            key="base"
          >
            基本设置
          </Menu.Item>
          <Menu.Item
            key="safe"
          >
            安全设置
          </Menu.Item>
        </Menu>
        <div className="setting_content">
          {selectedKey === 'base' && <BaseSetting
            accountInfo={accountInfo}
            onBaseSubmit={onBaseSubmit}
            settingBaseLoading={settingBaseLoading}
          />}
          {selectedKey === 'safe' && <SafeSetting
            accountInfo={accountInfo}
          />}
        </div>
      </div>
    </div>
  );
};

export default connect((state: any) => {
  const accountLoginedId = state.account.auth.loginAccountId;
  const accountLogined = accountSelector({ state, id: accountLoginedId });
  const { loading } = state;
  const settingBaseLoading = loading.effects[MODELS_KEYS.ACCOUNT.SETTING_BASE];
  return {
    accountInfo: accountLogined,
    settingBaseLoading,
  }
})(SettingView);
