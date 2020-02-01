/**
 * Created by romchung on 2020-01-30.
 *
 */
import { QuestionCircleOutlined, NotificationOutlined} from '@ant-design/icons/lib';
import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';
import HeaderSearch from '@/layouts/components/HeaderSearch';
import HeaderAccount from '@/layouts/components/HeaderAccount';

import './BasicLayout.scss';

const { Header, Content, Footer } = Layout;

export interface BasicLayoutProps {
  dispatch: Dispatch;
}

const RightContent = () => {
  const logined = false;
  return <React.Fragment>

      <HeaderAccount
        logined={logined}
        account={{}}
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
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  return (
    <Layout className="layout">
      <Header className="layout-header">
        <div className="logo" >
          捣蒜
        </div>
        <div className="header-right-menu">
          <RightContent/>
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

export default connect(() => ({

}))(BasicLayout);
