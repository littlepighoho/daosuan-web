

const ACCOUNT_ROOT = 'account';
const ACCOUNT = {
  ROOT: ACCOUNT_ROOT,
  LOGIN: `${ACCOUNT_ROOT}/login`,
  REGISTER: `${ACCOUNT_ROOT}/register`,
  CHECK_LOGIN: `${ACCOUNT_ROOT}/checkLogin`,
  LOGOUT: `${ACCOUNT_ROOT}/logout`,
  CHECK_NICKNAME: `${ACCOUNT_ROOT}/checkNickname`,
  SETTING_BASE: `${ACCOUNT_ROOT}/settingBase`,
  SETTING_SAFE: `${ACCOUNT_ROOT}/settingSafe`,
  SETTING_AVATAR: `${ACCOUNT_ROOT}/settingAvatar`,
  GET_ACCOUNT_ENTITY: `${ACCOUNT_ROOT}/getAccountEntity`,
  DASHBOARD: `${ACCOUNT_ROOT}/dashboard`,
  SEND_EMAIL: `${ACCOUNT_ROOT}/sendEmail`,
  GITHUB_AUTH: `${ACCOUNT_ROOT}/githubAuth`,
  OAUTH: `${ACCOUNT_ROOT}/oauth`,
  FOLLOW: `${ACCOUNT_ROOT}/follow`,
  CANCEL_FOLLOW: `${ACCOUNT_ROOT}/cancelFollow`
};

export const MODELS_KEYS = {
  ACCOUNT,
};
