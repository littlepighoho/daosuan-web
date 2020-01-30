/**
 * Created by romchung on 2020-01-30.
 *
 */

import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb } from 'antd';

import './index.scss';

const { Header, Content, Footer } = Layout;

export interface BasicLayoutProps {
  dispatch: Dispatch;
}


const BasicLayout: React.FC<BasicLayoutProps> = props => {
  return (
    <Layout className="layout">
      <Header className="layout-header">
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: '62px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        DAOSUAN
      </Footer>
    </Layout>
  );
};

export default connect(() => ({

}))(BasicLayout);
