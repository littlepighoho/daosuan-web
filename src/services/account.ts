import request from '@/utils/request';
import { APIS, apiUtil } from '@/constant/apis';

/**
 * 注册
 */
interface AccountRegisterPayloadType {
  username: string,
  password: string,
  nickname: string,
}

export async function AccountRegister(payload: AccountRegisterPayloadType) {
  return request(apiUtil(APIS.ACCOUNT.REGISTER), {
    method: 'POST',
    data: {
      email: payload.username,
      password: payload.password,
      nickname: payload.nickname,
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
 * 检查登录态
 *
 */
export async function AccountCheckLogin() {
  return request(apiUtil(APIS.ACCOUNT.CHECK_LOGIN), {
    method: 'GET',
  })
}
