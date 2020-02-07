/**
 * Created by romchung on 2020-01-30.
 *
 */

const ACCOUNT = {
  LOGIN: '/accounts/login/common',
  REGISTER: '/accounts/register',
  CHECK_LOGIN: '/accounts/check/login',
  LOG_OUT: '/accounts/logout',
  CHECK_NICKNAME: '/accounts/check/nickname/:name',
};


export const APIS = {
  ACCOUNT,
};


export const apiUtil =  (apiUrl: string) => {
  return `/server/api${apiUrl}`;
};
