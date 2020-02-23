import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import React from 'react';
import router from 'umi/router';
interface LoginAuthorityPropsType {
  children: any,
  logined: boolean,
}


const LoginAuthority: React.FC<LoginAuthorityPropsType> = props => {
  console.log(props);
  const { logined } = props;
  console.log(logined);
  if (logined) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }
  // router.push('/');
  return null;
};
// @ts-ignore
export default withRouter(connect((state: any) => {
  const { account } = state;
  console.log(account);
  return {
    logined: account.auth.logined
  }
})(LoginAuthority));