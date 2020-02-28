/**
 * Created by romchung on 2020-01-30.
 *
 */

const ACCOUNT = {
  LOGIN: '/accounts/login/common',
  REGISTER: '/accounts/register/email',
  CHECK_LOGIN: '/accounts/check/login',
  LOG_OUT: '/accounts/logout',
  CHECK_NICKNAME: '/accounts/check/nickname/:name',
  CURD: '/accounts/:aid',
  MEGT: '/accounts/_mget',
  LIST: '/accounts/list',
  DASHBOARD: '/accounts/:aid/dashboard',
  SENDMAIL: '/accounts/v/email/send',
  GITHUB: '/accounts/oauth/github/auth_url',
  OAUTH: '/accounts/unbind/oauth',
  FOLLOW: '/accounts/:aid/follow',
  CANCEL_FOLLOW: '/accounts/:aid/cancel_follow',
};

const RESOURCES = {
  DOWNLOAD: '/resources/local/:token',
};


export const APIS = {
  ACCOUNT,
  RESOURCES,
};


export const apiUtil =  (apiUrl: string) => {
  return `/server/api${apiUrl}`;
};
