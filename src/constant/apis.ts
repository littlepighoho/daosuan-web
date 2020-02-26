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
};


export const APIS = {
  ACCOUNT,
};


export const apiUtil =  (apiUrl: string) => {
  return `/server/api${apiUrl}`;
};
