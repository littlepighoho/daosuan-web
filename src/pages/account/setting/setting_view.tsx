import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import './setting_view.scss';
import { accountSelector } from '@/selector/account';
import { MODELS_KEYS } from '@/constant/models_keys';
import SafeSetting from '@/pages/account/setting/widgets/safe_setting';
import BaseSetting from '@/pages/account/setting/widgets/base_setting';
import withRouter from 'umi/withRouter';

interface SettingViewPropsType {
  accountInfo: any,
  settingBaseLoading: boolean,
  dispatch: Dispatch<AnyAction>,
  location: any,
}
// 个人设置
const SettingView: React.FC<SettingViewPropsType> = props => {
  const {
    accountInfo,
    dispatch,
    settingBaseLoading,
    location,
  } = props;
  const [ hasFetchEntity, setHasFetchEntity] = useState(false);
  const [ selectedKey, setSelectedKey] = useState('base');
  useEffect(() => {
    console.log('123')
    dispatch({
      type: MODELS_KEYS.ACCOUNT.GET_ACCOUNT_ENTITY,
      payload: {
        accountId: accountInfo.id,
      },
    })
  }, [hasFetchEntity]);

  const onBaseSubmit = (values: any) => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.SETTING_BASE,
      payload: {
        nickname: values.nickname,
        motto: values.motto,
        accountId: accountInfo.id
      },
      callback: () => {
        setHasFetchEntity(!hasFetchEntity);
      }
    });
  };
  const { pathname } = location;
  const bindGithubAccount = () => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.GITHUB_AUTH,
      payload: {
        referer: pathname,
        type: 1,
      },
      callback: () => {
        setHasFetchEntity(!hasFetchEntity);
      }
    })
  };

  const unbindOauthAccount = () => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.OAUTH,
      payload: {
        model: 2,
      },
      callback: () => {
        setHasFetchEntity(!hasFetchEntity);
      }
    })
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
            bindGithubAccount={bindGithubAccount}
            unbindOauthAccount={unbindOauthAccount}
            accountInfo={accountInfo}
          />}
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect((state: any) => {
  const accountLoginedId = state.account.auth.loginAccountId;
  const accountLogined = accountSelector({ state, id: accountLoginedId });
  const { loading } = state;
  const settingBaseLoading = loading.effects[MODELS_KEYS.ACCOUNT.SETTING_BASE];
  return {
    accountInfo: accountLogined,
    settingBaseLoading,
  }
})(SettingView));
