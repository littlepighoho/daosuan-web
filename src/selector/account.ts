import { EntitiesModelStateType } from '@/models/entities';
import { get } from 'lodash-es';

// 单个账户selector
interface AccountSelectorPropsType {
  id: string | number | undefined,
  state: any,
}

export const accountSelector = (props: AccountSelectorPropsType) => {
  const { id, state } = props;
  console.log(state, id);
  const accounts = state.entities.accounts;
  // 有这个entity
  if (get(accounts, `${id}`, null)) {
    return accounts[id as number | string];
  } else {
    console.log('accountSelector error: 无指定id的entity')
  }
};

