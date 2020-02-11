import { EntitiesModelStateType } from '@/models/entities';
import { get } from 'lodash-es';

// 单个账户selector
interface AccountSelectorPropsType {
  id: string | number | undefined,
  state: any,
}

export const accountSelector = (props: AccountSelectorPropsType) => {
  const { id, state } = props;
  if(id === undefined) return null;
  const accounts = state.entities.accounts;
  // 有这个entity
  if (get(accounts, `${id.toString()}`, null)) {
    return accounts[id as number | string];
  } else {
      console.log('accountSelector error: 无指定id的entity')
  }
};


interface DashboardSelectorPropsType {
  state: any,
}
export const dashboardSelector = (props: DashboardSelectorPropsType) => {
  const { state } = props;
  if (state.account.dashboard) {
    return state.account.dashboard;
  }
  return null;
};

