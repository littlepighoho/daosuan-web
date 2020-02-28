import request from '@/utils/request';
import { APIS, apiUtil } from '@/constant/apis';
import PathToRegexp from 'path-to-regexp';

/**
 * 注册
 */
interface AccountRegisterPayloadType {
  username: string,
  password: string,
  nickname: string,
  token: string,
}

export async function AccountRegister(payload: AccountRegisterPayloadType) {
  return request(apiUtil(APIS.ACCOUNT.REGISTER), {
    method: 'POST',
    data: {
      email: payload.username,
      password: payload.password,
      nickname: payload.nickname,
      token: payload.token,
    }
  });
}


/**
 * 登录
 */
interface AccountLoginPayloadType {
  username: string,
  password: string,
  remember: boolean,
}

export async function AccountLogin(payload: AccountLoginPayloadType) {
  return request(apiUtil(APIS.ACCOUNT.LOGIN), {
    method: 'POST',
    params: {
      key: 2,
    },
    data: {
      key: payload.username,
      password: payload.password,
      remember: payload.remember,

    }
  });
}

/**
 * 登出
 */

export async function AccountLogout() {
  return request(apiUtil(APIS.ACCOUNT.LOG_OUT), {
    method: 'GET',
  })
}

/**
 * 检查登录态
 *
 */
export async function AccountCheckLogin() {
  return request(apiUtil(APIS.ACCOUNT.CHECK_LOGIN), {
    method: 'GET',
  })
}

/**
 * 检查昵称是否存在
 */

interface AccountCheckNicknamePayloadType {
  nickname: string,
}
export async function AccountCheckNickname(payload: AccountCheckNicknamePayloadType) {
  console.log(payload)
  const pattern = PathToRegexp.compile(apiUtil(APIS.ACCOUNT.CHECK_NICKNAME));
  return request(pattern({ name: payload.nickname }), {
    method: 'GET',
  })
}

/**
 * 修改基本信息　
 *
 */
interface AccountSettingPayloadType {
  accountId?: number | string,
  nickname?: string,
  motto?: string,
  avator?: string,
  role?: number,
  new_password?: string,
  old_password? :string,
}
export async function AccountSetting(payload: AccountSettingPayloadType) {
  const pattern = PathToRegexp.compile(apiUtil(APIS.ACCOUNT.CURD));
  return request(pattern({ aid: payload.accountId }), {
    method: 'PUT',
    data: { ...payload }
  })
}

/**
 * 获取账户entity
 */
interface AccountGetAccountEntityPayloadType {
  accountId: number | string,
}

export async function AccountGetAccountEntity(payload: AccountGetAccountEntityPayloadType) {
  const pattern = PathToRegexp.compile(apiUtil(APIS.ACCOUNT.CURD));
  return request(pattern(({ aid: payload.accountId })), {
    method: 'GET'
  })
}

/**
 * dashboard
 */
interface AccountDashboardPayloadType {
  accountId: number | string,
}

export async function AccountDashboard(payload: AccountDashboardPayloadType) {
  const pattern = PathToRegexp.compile(apiUtil(APIS.ACCOUNT.DASHBOARD));
  return request(pattern(({ aid: payload.accountId})), {
    method: 'GET',
  })
}

/**
 * 发送邮件
 */
interface AccountSendEmailPayloadType  {
  email: string,
}

export async function AccountSendEmail(payload: AccountSendEmailPayloadType) {
  return request(apiUtil(APIS.ACCOUNT.SENDMAIL), {
    method: 'GET',
    params: {
      target: payload.email,
    }
  })
}


/**
 * 第三方解除绑定
 */
interface AccountOauthPayloadType {
  model: number,
}
export async function AccountOauth(payload: AccountOauthPayloadType) {
  return request(apiUtil(APIS.ACCOUNT.OAUTH), {
    method: 'GET',
    params: {
      model: payload.model,
    }
  })
}

interface AccountFollowPayloadType {
  accountId: number | string,
}

export async function AccountFollow(payload: AccountFollowPayloadType) {
  const pattern = PathToRegexp.compile(apiUtil(APIS.ACCOUNT.FOLLOW));
  return request(pattern({ aid: payload.accountId }), {
    method: 'GET',
  })
}
// /**
//  * github验证
//  */
// interface AccountGithubAuthPayloadType {
//
// }
//
// export async function AccountGithubAuthPayload(payload: AccountGithubAuthPayloadType) {
//   return request(apiUtil(APIS.ACCOUNT.GITHUB), {
//     method: 'POST',
//   })
// }

interface AccountCancelFollowPayloadType {
  accountId: number | string,
}

export async function AccountCancelFollow(payload: AccountCancelFollowPayloadType) {
  const pattern = PathToRegexp.compile(apiUtil(APIS.ACCOUNT.CANCEL_FOLLOW));
  return request(pattern({ aid: payload.accountId }), {
    method: 'GET',
  })
}
