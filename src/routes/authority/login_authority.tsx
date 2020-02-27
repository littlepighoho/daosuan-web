import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';

interface LoginAuthorityPropsType {
  children: any,
  logined: boolean,
  loading: boolean,
}


const LoginAuthority: React.FC<LoginAuthorityPropsType> = props => {
  const { logined, loading } = props;
  if (logined && !loading) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }
  if (!loading) {
    router.push('/');
  }
  return null;
};
// @ts-ignore
export default withRouter(connect((state: any) => {
  const { account, loading} = state;
  return {
    logined: account.auth.logined,
    loading: loading.effects["account/checkLogin"] !== false
      && loading.effects["account/getAccountEntity"] !== false,
  }
})(LoginAuthority));
