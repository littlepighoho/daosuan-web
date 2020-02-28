import React, { useState, useEffect } from 'react';
import { Avatar, Button, Col, Divider, Row, Spin, Statistic, Typography } from 'antd';
import { resourceUrl } from '@/utils/resource_helper';
import { get } from 'lodash-es';

import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { EnvironmentOutlined, MailOutlined, EyeInvisibleOutlined } from '@ant-design/icons/lib';
import { UserOutlined, EyeOutlined } from '@ant-design/icons';
import './index.scss';
import { MODELS_KEYS } from '@/constant/models_keys';

const { Title } = Typography;

interface AccountProfilePropsType {
  following: any,
  followers: any,
  accountInfo: any,
  dashboard: any,
  product: any,
  accountId: number | undefined,
  canManage: boolean,
  dispatch: Dispatch<AnyAction>,
  accountLoginedId: number | string,
}

const AccountProfile: React.FC<AccountProfilePropsType> = props => {
  const {
    following,
    followers,
    accountInfo,
    dashboard,
    product,
    accountId,
    canManage,
    dispatch,
    accountLoginedId,
  } = props;

  const handleWatch = () => {

    dispatch({
      type: MODELS_KEYS.ACCOUNT.FOLLOW,
      payload: {
        accountId: accountId,
      },
    })
  };
  const handleCancelWatch = () => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.CANCEL_FOLLOW,
      payload: {
        accountId: accountId,
      },
    })
  }
  return (
    <Spin spinning={!dashboard && !product && !following && !followers} >
      <div className="account_content">
        <div className="account_info">
          <AccountWatch
            followers={followers}
            accountId={accountId}
            canManage={canManage}
            handleWatch={handleWatch}
            handleCancelWatch={handleCancelWatch}
            accountLoginedId={accountLoginedId}
          />

          <Avatar
            src={resourceUrl(get(accountInfo, 'avator', ''))}
            style={{
              height: '104px',
              width: '104px',
              backgroundColor: '#87d068'
            }}
            icon={<UserOutlined style={{ fontSize: '48px', lineHeight: '110px'}}/>}
          />
          <Title level={4}>
            {get(accountInfo, 'nickname', '')}
          </Title>
          <div>
            {get(accountInfo, 'motto', '') === '' ? '这个人很懒 什么都没有留下': get(accountInfo, 'motto', '')}
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
  )
};

export default connect((state: any) => {
  const { account } = state;
  const dashboard = account.dashboard;
  const accountLoginedId = account.auth.loginAccountId;
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
})(AccountProfile);


interface AccountWatchPropsType {
  accountId: number | undefined,
  followers: [] | null,
  canManage: boolean,
  handleWatch: () => void;
  accountLoginedId: number | string,
  handleCancelWatch: () => void,
}
const AccountWatch: React.FC<AccountWatchPropsType> = props => {
  const {
    canManage,
    followers,
    accountId,
    accountLoginedId,
    handleWatch,
    handleCancelWatch,
  } = props;
  const [hasFollowed, setHasFollowed] = useState(false);
  useEffect(() => {
    if(followers) {
      console.log(followers);
      setHasFollowed(
        followers
          .filter((item: { id: number| string, nickname: string, motto: string}) => +item.id === +accountLoginedId).length !== 0)
    }
    console.log(hasFollowed)
  }, [accountLoginedId, followers, hasFollowed])


  return (
    <React.Fragment>
      {!canManage ? <div className="account_watch">
        {(accountId && !hasFollowed) ?
          <Button onClick={handleWatch} icon={<EyeOutlined/>}> 关注</Button>
          : <Button onClick={handleCancelWatch} type="dashed" danger icon={<EyeInvisibleOutlined/>}> 取消</Button> }
      </div> : <div className="account_watch">
        <div className="account_watch_self">
          <span>
            欢迎回来
          </span>
        </div>
      </div>}
    </React.Fragment>
  )
};
