/**
 * Created by romchung on 2020-01-30.
 *
 */
import { QuestionCircleOutlined, NotificationOutlined} from '@ant-design/icons/lib';
import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Layout, Menu, Row, Col, Typography } from 'antd';
import HeaderSearch from '@/components/header/HeaderSearch';
import HeaderAccount from '@/components/header/HeaderAccount';
import { get } from 'lodash-es';
import withRouter from 'umi/withRouter';

// import { TransitionGroup, CSSTransition } from "react-transition-group";
import './BasicLayout.scss';
import { AccountModelStateType } from '@/models/account';
import { MODELS_KEYS } from '@/constant/models_keys';
import router from 'umi/router';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;


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
  location: any,
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    account,
    dispatch,
    location,
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
      case 'market': {
        router.push('/market');
        break;
      }
      case 'community': {
        router.push('/community');
        break;
      }
    }
  };

  const handleMenuClick = (item: any) => {
    routerChange(item.key)();
  };

  const menuKey = location.pathname.split("/")[1];

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
          onClick={handleMenuClick}
          selectedKeys={[menuKey]}
        >
          <Menu.Item className="menu-item" key="market">物料市场</Menu.Item>
          <Menu.Item className="menu-item" key="community">社区</Menu.Item>
        </Menu>

      </Header>
      <Content>
        {props.children}
      </Content>
      <Footer className="layout-footer">
        <Row className="footer-body">
          <Col span={4}>
            <h3 className="footer-item-title" >
              Github
            </h3>
            <h4>
              <a style={{ fontSize: '14px', color: '#6E717C'}} >TtTRz</a>
            </h4>
            <h4>
              <a style={{ fontSize: '14px', color: '#6E717C'}} >Shoogoome</a>
            </h4>
          </Col>
          <Col span={4}>
            <h3 className="footer-item-title" >
              相关资源
            </h3>
          </Col>
          <Col span={4}>
            {/*<h3 className="footer-item-title" >*/}
            {/*</h3>*/}
          </Col>
          <Col span={12} >
            <Title level={4} style={{ float: 'right' }}>
              <p className="footer-body-extra">
                Version: 0.0.1
              </p>
              <p className="footer-body-license" >
              Released under the MIT License
              </p>
              <p className="footer-body-net" >
                <a href="http://beian.miit.gov.cn/">粤ICP备19050376号</a>
              </p>
            </Title>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default withRouter(connect(({ account }: any) => ({
  account,
}))(BasicLayout));
