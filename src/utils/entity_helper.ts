
/**
 * 获取store的state
 */
const getAppState = () => {
  //@ts-ignore
  return window.g_app._store.getState();
};

/**
 * 根据传入的entitiesKey
 * 获取state.entities中相应的entities
 * @param state
 * @param entitiesKey
 */
const getStateEntities = (state: any, entitiesKey: string): any => {
  const { entities } = state; // 获取entities
  const hasEntities = entities.hasOwnProperty(entitiesKey); // 判断entities中是否含有entitiesKey
  if (!hasEntities) {
    console.log(`entities中不存在: ${entitiesKey}`);
    return null
  }
  return entities[entitiesKey];
};

/**
 * entitiesList中的Entity
 */
interface EntityType {
  id: number,
  update_time?: number,
}

/**
 * diffEntities参数
 */
interface DiffEntitiesParamType {
  entitiesList: EntityType[],
  entitiesKey: string,
  log?: boolean,
}

/**
 * 比对源entitiesList和存在于store的entitiy
 * 发现需要更新的entitiy
 * 返回ids[]
 * @param entitiesList
 * @param entitiesKey
 * @param log
 * @return ids[]
 */
const  diffEntities= ({ entitiesList, entitiesKey, log = false}: DiffEntitiesParamType): number[] => {
  // 获取全局store的state
  const state = getAppState();
  // 需要更新的ids
  const willUpdateIds: number[] = [];
  // 获取key为entitiesKey的entities
  const entitiesState = getStateEntities(state, entitiesKey);
  // 没有找到目标entities
  if(!entitiesState) {
    if(log) console.log(`entities中无【${entitiesKey}】`);
      return [];
  }
  /*
    对源数组进行diff操作
    源数组内容 例子: [{ id: 1, update_time: 200000000 }, { id: 2, update_time: 20000300 }]
   */
  entitiesList.forEach((item: EntityType, index: number) => {
    // 判断该entities是否存在这个id
    const includeInEntities = entitiesState.hasOwnProperty(item.id)
    if (!includeInEntities) {
      // 在entities中无该id内容，放入需要更新列表
      willUpdateIds.push(item.id);
    } else {
      // 已存在该id的entity 比较update_time
      const entity_update_time = Math.floor(entitiesState[item.id].update_time);
      if (entity_update_time < Math.floor(item.update_time as number)) {
        // 新的update_time大于entitiy 放入需要更新列表
        willUpdateIds.push(item.id);
      }
    }
    // TODO Reselect优化
  });
  return willUpdateIds;
};


export const entityHelper = {
  diffEntities,
};

