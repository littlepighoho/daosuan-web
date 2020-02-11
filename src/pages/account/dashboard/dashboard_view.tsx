import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Typography, Row, Col, Statistic, Spin } from 'antd';
import { MailOutlined, EnvironmentOutlined } from '@ant-design/icons/lib';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { get } from 'lodash-es';

import './dashboard_view.scss';
import ProductsCardsList from '@/pages/account/dashboard/widgets/products_cards_list';
import TabsList from '@/pages/account/dashboard/widgets/tabs_list';
import { accountSelector, dashboardSelector } from '@/selector/account';
import { MODELS_KEYS } from '@/constant/models_keys';

const { Title } = Typography;


interface DashboardViewPropsType {
  dispatch: Dispatch<AnyAction>,
  accountInfo: any,
  accountLoginedId: number | string,
  followers: any,
  following: any,
  product: any,
  stars: any,
  dashboard: any
}

const DashboardView: React.FC<DashboardViewPropsType> = props => {
  const {
    dispatch,
    accountLoginedId,
    accountInfo,
    followers,
    following,
    product,
    stars,
    dashboard,
  } = props;
  useEffect(() => {
    if (accountLoginedId !== undefined) {
      dispatch({
        type: MODELS_KEYS.ACCOUNT.DASHBOARD,
        payload: {
          accountId: accountLoginedId,
        }
      })
    }
  }, [accountLoginedId]);
  return (
    <div className="dashboard_view">
        <div className="left_content">
          <Spin spinning={!dashboard && !product && !following && !followers} >
            <div className="account_content">
            <div className="account_info">
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                style={{
                  height: '104px',
                  width: '104px',
                }}
              />
              <Title level={4}>
                {get(accountInfo, 'nickname', '')}
              </Title>
              <div>
                {get(accountInfo, 'motto', '')}
              </div>
            </div>
            <div className="account_extra">
              <div className="extra_item">
                <MailOutlined />
                {get(accountInfo, 'email', '')}
              </div>
              <div className="extra_item">
                <EnvironmentOutlined />
                广东省-珠海市-北京师范大学珠海分校
              </div>
            </div>
            <Divider dashed />
          </div>
          <div className="account_statistics">
            <Row gutter={4} >
              <Col span={8} style={{ textAlign: 'center'}} >
                <Statistic title="产品数" value={get(product, 'length', 0)} suffix="个"/>
              </Col>
              <Col span={8} style={{ textAlign: 'center'}} >
                <Statistic title="关注者" value={get(following, 'length', 0)} suffix="人"/>
              </Col>
              <Col span={8} style={{ textAlign: 'center'}} >
                <Statistic title="跟随者" value={get(followers, 'length', 0)} suffix="人"/>
              </Col>
            </Row>
          </div>
          </Spin>
        </div>
        <div className="right_content">
          <Spin spinning={!product}>
            <ProductsCardsList
              productData={product}
            />
          </Spin>
          <TabsList
            starsData={stars}
          />
        </div>
    </div>
  );

};

export default connect((state: any) => {
  const accountLoginedId = state.account.auth.loginAccountId;
  const dashboard = state.account.dashboard;
  const accountInfo = get(dashboard, 'info', null);
  const followers = get(dashboard, 'followers', null);
  const following = get(dashboard, 'following', null);
  const product = get(dashboard, 'product', null);
  const stars = get(dashboard, 'stars', null);
  return {
    accountLoginedId,
    accountInfo,
    followers,
    following,
    product,
    stars,
    dashboard,
  }
})(DashboardView);

