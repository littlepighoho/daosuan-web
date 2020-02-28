import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { get } from 'lodash-es';
import withRouter from 'umi/withRouter';
import AccountProfile from '@/pages/account/dashboard/widgets/AccountProfile/index';

import './dashboard_view.scss';
import ProductsCardsList from '@/pages/account/dashboard/widgets/products_cards_list';
import TabsList from '@/pages/account/dashboard/widgets/tabs_list';
import { MODELS_KEYS } from '@/constant/models_keys';


interface DashboardViewPropsType {
  dispatch: Dispatch<AnyAction>,
  accountInfo: any,
  accountLoginedId: number | string,
  followers: any,
  following: any,
  product: any,
  stars: any,
  dashboard: any,
  location: any,
  match: any,
}

const DashboardView: React.FC<DashboardViewPropsType> = props => {
  const {
    dispatch,
    accountLoginedId,
    product,
    stars,
    location,
    match,
  } = props;

  const [canManage, setCanManage] = useState(false);

  const pathKey = location.pathname.split("/")[2];

  useEffect(() => {
    (pathKey === "dashboard" || +match.params.aid === +accountLoginedId) ?
      setCanManage(true) : setCanManage(false)

    if(match.params.aid !== undefined && pathKey !== "dashboard") {
      dispatch({
        type: MODELS_KEYS.ACCOUNT.DASHBOARD,
        payload: {
          accountId: match.params.aid,
        }
      })
    }
    if (accountLoginedId !== undefined && pathKey === "dashboard") {
      dispatch({
        type: MODELS_KEYS.ACCOUNT.DASHBOARD,
        payload: {
          accountId: accountLoginedId,
        }
      })
    }
  }, [accountLoginedId, match.params.aid]);
  return (
    <div className="dashboard_view">
      <div className="left_content">
        <AccountProfile
          canManage={canManage}
          accountId={match.params.aid}
        />
      </div>
      <div className="right_content">
        <Spin spinning={!product}>
          <ProductsCardsList
            productData={product}
            canManage={canManage}
          />
        </Spin>
        <TabsList
          starsData={stars}
          canManage={canManage}
        />
      </div>
    </div>
  );

};

export default withRouter(connect((state: any) => {
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
})(DashboardView));

