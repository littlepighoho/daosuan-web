import { Effect } from 'dva';
import { Reducer } from 'redux';
import { get } from 'lodash-es';


// entities结构
export interface EntitiesModelStateType {
  accounts?: any,
}

interface EntitiesModelType {
  namespace: string;
  state: EntitiesModelStateType;
  effects: {

  };
  reducers: {
    updateEntities: Reducer<EntitiesModelStateType>,
  };
}

interface updateEntitiesPayloadType {
  entityKey: string,
  entities: any,
}

const EntitiesModel: EntitiesModelType = {
  namespace: 'entities',

  state: {

  },
  effect: {

  },

  reducers: {
    //@ts-ignore
    updateEntities(state, { payload }: { payload: updateEntitiesPayloadType}) {
      if (get(state, `${payload}`, null)) {
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
