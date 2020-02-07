import React, { useState } from 'react';
import { Avatar, Button, Dropdown, Menu, Spin } from 'antd';
import { LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons/lib';
import { connect } from 'dva';
import { get } from 'lodash-es';
import './index.scss'
import LoginFormModal from '@/layouts/components/modal/LoginFormModal';
import { accountSchema } from '@/schema/account_schema';
import { accountSelector } from '@/selector/account';
import { AnyAction, Dispatch } from 'redux';
import { MODELS_KEYS } from '@/constant/models_keys';

interface HeaderAccountPropsType {
  dispatch: Dispatch<AnyAction>;
  className?: string,
  logined: boolean,
  currentAccount: any,
  accountLoading: boolean,
}

const HeaderAccount: React.FC<HeaderAccountPropsType> = props => {
  const {
    logined,
    dispatch,
    currentAccount,
    className,
    accountLoading,
  } = props;

  const [ loginModalVisible, setLoginModalVisible ]= useState(false);

  const handleLogout = () => {
    dispatch(({
      type: MODELS_KEYS.ACCOUNT.LOGOUT,
      payload: {},
    }));
    setLoginModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  const handleLoginButtonClick = () => {
    setLoginModalVisible(true);
  };
  if (accountLoading) {
    return <div style={{ width: '144px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spin />
    </div>
  } else if (logined) {
    return <Dropdown
      overlay={menu}
      placement="bottomRight"
      overlayStyle={{ width: '140px' }}
    >
      <div className={className}>
        <Avatar
          style={{ margin: '14px 8px 0 8px' }}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <div className="account-name" style={{ lineHeight: "65px" }}>{get(currentAccount, 'nickname', '')}</div>
      </div>
    </Dropdown>
  }

  return (
    <div className={className}>
      <Button
        type="default"
        onClick={handleLoginButtonClick}
      >
        <LoginOutlined />登 录
      </Button>
      <LoginFormModal
        visible={loginModalVisible}
        setVisible={setLoginModalVisible}
      />
    </div>
  )
};

export default connect((state: any, props: any) => {
  const { loading, account } = state;
  // 当前登录用户信息
  const currentAccount = accountSelector({ state: state, id: account.auth.loginAccountId });
  let accountLoadingList = [
    loading.effects[MODELS_KEYS.ACCOUNT.LOGOUT],
    loading.effects[MODELS_KEYS.ACCOUNT.CHECK_LOGIN]
  ];
  let accountLoading = false;
  if( accountLoadingList.filter(item => item === true).length === 0) {
    accountLoading = false;
  } else {
    accountLoading = true;
  }

  return {
    accountLoading,
    currentAccount,
  }
})(HeaderAccount);
