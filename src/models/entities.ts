import { Effect } from 'dva';
import { Reducer } from 'redux';
import { get } from 'lodash-es';
import { entityHelper } from '@/utils/entity_helper';


// entities结构
export interface EntitiesModelStateType {
  accounts?: any,
}

interface EntitiesModelType {
  namespace: string;
  state: EntitiesModelStateType;
  effects: {
    updateEntities: Effect,
  };
  reducers: {
    updateEntitiesState: Reducer<EntitiesModelStateType>,
  };
}

interface updateEntitiesPayloadType {
  entityKey: string,
  entities: any,
}

const EntitiesModel: EntitiesModelType = {
  namespace: 'entities',

  state: {
    accounts: {},
  },

  effects: {
    *updateEntities({ payload }, { put }) {
      try {
        yield put({
          type: 'updateEntitiesState',
          payload: {
            entityKey: payload.entityKey,
            entities: payload.entities,
          }
        })
      } catch (e) {

      }
    }
  },

  reducers: {
    //@ts-ignore
    updateEntitiesState(state, { payload }: { payload: updateEntitiesPayloadType}) {
      if (get(state, `${payload.entityKey}`, null)) {
        return {
          ...state,
          [payload.entityKey]: {
            ...get(state, `${payload.entityKey}`, ),
            ...payload.entities,
          }
        }
      }
      console.log(`entities中无指定key:${payload.entityKey}`)
      return {
        ...state,
      }
    }
  },
};

export default EntitiesModel;
