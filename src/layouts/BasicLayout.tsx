/**
 * Created by romchung on 2020-01-30.
 *
 */
import { QuestionCircleOutlined, NotificationOutlined} from '@ant-design/icons/lib';
import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';
import HeaderSearch from '@/layouts/components/header/HeaderSearch';
import HeaderAccount from '@/layouts/components/header/HeaderAccount';
import { get } from 'lodash-es';


import './BasicLayout.scss';
import { AccountModelStateType } from '@/models/account';
import { MODELS_KEYS } from '@/constant/models_keys';
import router from 'umi/router';

const { Header, Content, Footer } = Layout;



const RightContent = (props: any) => {
  const { logined, handleLogout} = props;
  return <React.Fragment>

      <HeaderAccount
        logined={logined}
        handleLogout={handleLogout}
        className={logined ? 'header-account' : 'header-login'}
      />

      <div className="header-notification">
        <NotificationOutlined style={{ fontSize: '20px' }}/>
      </div>

      <div className="header-question">
        <QuestionCircleOutlined style={{ fontSize: '20px' }}/>
      </div>

      <HeaderSearch
        className="header-search"
        placeholder="搜索"
        onSearch={(value) => {
          console.log(value)}
        }
      />
  </React.Fragment>
};

export interface BasicLayoutProps {
  dispatch: Dispatch;
  account: AccountModelStateType,
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    account,
    dispatch,
  } = props;

  useEffect(() => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.CHECK_LOGIN,
    })
  },[]);

  const routerChange = (key: string) => () => {
    switch (key) {
      case 'index': {
        router.push('');
        break;
      }
    }
  };
  const { auth } = account;
  return (
    <Layout className="layout">
      <Header className="layout-header">
        <div className="logo" onClick={routerChange('index')}>
          捣蒜
        </div>
        <div className="header-right-menu">
          <RightContent
            logined={get(auth, 'logined', false)}
          />
        </div>
        <Menu
          className="header-menu"
          theme="light"
          mode="horizontal"
        >
          <Menu.Item className="menu-item" key="market">物料</Menu.Item>
          <Menu.Item className="menu-item" key="community">社区</Menu.Item>
        </Menu>

      </Header>
      <Content>
        <div className="layout-content">
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        DAOSUAN
      </Footer>
    </Layout>
  );
};

export default connect(({ account }: any) => ({
  account,
}))(BasicLayout);
