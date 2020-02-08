import { MODELS_KEYS } from '@/constant/models_keys';
import { message } from 'antd';
import { get } from 'lodash-es';
import { Reducer } from 'redux';
import { Effect } from 'dva';
import {
  AccountCheckLogin,
  AccountCheckNickname,
  AccountLogin,
  AccountLogout,
  AccountRegister,
} from '@/services/account';
import { normalize } from 'normalizr';
import { accountSchema } from '@/schema/account_schema';
import { entityHelper } from '@/utils/entity_helper';


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
    logout: Effect;
    checkLogin: Effect;
    checkNickname: Effect,
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
        const response = yield call(AccountLogin, payload);
        if (get(response, 'id', null)) {
          // yield put({
          //   type: 'changeLoginStatus',
          //   payload: {
          //     id: response.account.id,
          //   }
          // });
          yield put({
            type: 'checkLogin',
            payload: {},
          })
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 登出
    *logout(_, { call, put }) {
      try {
        const response = yield call(AccountLogout, _);
        if (response.status) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: false,
              id: null,
            }
          })
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 注册
    *register({ payload, callback }, { call, put }) {
      try {
        const response = yield call(AccountRegister, payload);
        // 回调 注册成功
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
        if (response.status) {
          // 对accounts的entity作diff操作 判断需不需要更新entities
          const entitiesList = [{ id: response.account.id, update_time: response.account.update_time }];
          const willUpdateList = entityHelper.diffEntities({
            entitiesKey: 'accounts',
            entitiesList: entitiesList,
          });
          // 更新accounts的entity信息
          if(willUpdateList.length > 0) {
            // 标准化account的格式
            const entities = normalize(response.account, accountSchema);
            const { account } = entities.entities;
            yield put({
              type: 'entities/updateEntities',
              payload: {
                entityKey: 'accounts',
                entities: account,
              }
            });
          }
          // 变更登录态
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: true,
              id: response.account.id,
            }
          })
        }
      } catch (e) {
        message.error(e.toString())
      }
    },

    // 检查昵称是否存在
    *checkNickname({ payload, callback }, { call, put }) {
      try {
        const response = yield call(AccountCheckNickname, payload);
        const { exists } = response;
        callback(exists);
      } catch (e) {
        message.error(e.toString())
      }
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        auth: {
          logined: payload.status,
          loginAccountId: payload.id,
        }
      };
    },
  },
};

export default AccountModel;
