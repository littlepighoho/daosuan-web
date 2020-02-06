import { MODELS_KEYS } from '@/constant/models_keys';
import { message } from 'antd';
import { get } from 'lodash-es';
import { Reducer } from 'redux';
import { Effect } from 'dva';
import { AccountCheckLogin, AccountLogin, AccountRegister } from '@/services/account';


export interface AccountModelStateType {
  auth?: {
    logined?: boolean,
    loginAccountId?: number | undefined | null,
  },
}

interface AccountModelType {
  namespace: string;
  state: AccountModelStateType;
  effects: {
    login: Effect;
    register: Effect;
    checkLogin: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<AccountModelStateType>;
  };
}


const AccountModel: AccountModelType = {
  namespace: MODELS_KEYS.ACCOUNT.ROOT,

  state: {
    auth: {
      logined: false,
      loginAccountId: undefined,
    }
  },

  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      try {
        const response= yield call(AccountLogin, payload);
        if (get(response, 'id', null)) {

        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 注册
    *register({ payload, callback }, { call, put }) {
      try {
        const response = yield call(AccountRegister, payload);
        // 回调
        if (get(response, 'id', null)) {
          callback();
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 检查登录态
    *checkLogin(_, { call, put }) {
      try {
        const response = yield call(AccountCheckLogin, _);
        console.log(response);
      } catch (e) {
        message.error(e.toString())
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
      };
    },
  },
};

export default AccountModel;
