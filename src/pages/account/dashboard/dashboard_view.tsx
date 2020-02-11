import React from 'react';
import { Avatar, Divider, Typography, Row, Col, Statistic, Spin } from 'antd';
import { MailOutlined, EnvironmentOutlined } from '@ant-design/icons/lib';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { get } from 'lodash-es';

import './dashboard_view.scss';
import ProductsCardsList from '@/pages/account/dashboard/widgets/products_cards_list';
import TabsList from '@/pages/account/dashboard/widgets/tabs_list';
import { accountSelector } from '@/selector/account';

const { Title } = Typography;


interface DashboardViewPropsType {
  dispatch: Dispatch<AnyAction>,
  accountInfo: any,
}

const DashboardView: React.FC<DashboardViewPropsType> = props => {
  const {
    dispatch,
    accountInfo,
  } = props;

  return (
    <div className="dashboard_view">
        <div className="left_content">
          <Spin spinning={!accountInfo} >
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
          </Spin>
          <div className="account_statistics">
            <Row gutter={4} >
              <Col span={8} style={{ textAlign: 'center'}} >
                <Statistic title="产品数" value={10} suffix="个"/>
              </Col>
              <Col span={8} style={{ textAlign: 'center'}} >
                <Statistic title="关注者" value={20} suffix="人"/>
              </Col>
              <Col span={8} style={{ textAlign: 'center'}} >
                <Statistic title="跟随者" value={10} suffix="人"/>
              </Col>
            </Row>
          </div>
        </div>
        <div className="right_content">
          <ProductsCardsList />
          <TabsList />
        </div>
    </div>
  );

};

export default connect((state: any) => {
  const accountLoginedId = state.account.auth.loginAccountId;
  const accountInfo = accountSelector({ id: accountLoginedId, state});
  return {
    accountInfo,
  }
})(DashboardView);

