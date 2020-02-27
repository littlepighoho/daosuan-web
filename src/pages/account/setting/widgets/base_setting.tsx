import React from 'react';
import { Spin, Typography} from 'antd';
import AccountBaseSettingForm from '@/components/form/account/AccountBaseSettingForm';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { MODELS_KEYS } from '@/constant/models_keys';
import { accountSelector } from '@/selector/account';
const { Title } = Typography;

// 基本信息
interface BaseSettingPropsType {
  accountInfo: any,
  onBaseSubmit: (values: any) => void,
  settingBaseLoading: boolean,
  settingAvatarLoading: boolean,
  hasFetchEntityCallBack: () => void,
  dispatch: Dispatch<AnyAction>,
}

const BaseSetting:React.FC<BaseSettingPropsType> = props => {
  const {
    accountInfo,
    onBaseSubmit,
    settingBaseLoading,
    dispatch,
    hasFetchEntityCallBack,
    settingAvatarLoading,
  } = props;

  const onSubmitAvatar = (values: string) => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.SETTING_AVATAR,
      payload: {
        effectType: 'avatar',
        accountId: accountInfo.id,
        avatar: values,
      },
      callback: () => {
        hasFetchEntityCallBack()
      }
    })
  };

  return (
    <React.Fragment>
      <Title level={3}>
        基本设置
      </Title>
      <Spin spinning={!accountInfo}>
        <AccountBaseSettingForm
          onSubmitAvatar={onSubmitAvatar}
          settingAvatarLoading={settingAvatarLoading}
          accountInfo={accountInfo}
          onSubmit={onBaseSubmit}
          settingBaseLoading={settingBaseLoading}
        />
      </Spin>
    </React.Fragment>
  )
};

export default connect((state: any) => {
  const accountLoginedId = state.account.auth.loginAccountId;
  const accountLogined = accountSelector({ state, id: accountLoginedId });
  const { loading } = state;
  const settingBaseLoading = loading.effects[MODELS_KEYS.ACCOUNT.SETTING_BASE];
  const settingAvatarLoading = loading.effects[MODELS_KEYS.ACCOUNT.SETTING_AVATAR];
  return {
    accountInfo: accountLogined,
    settingBaseLoading,
    settingAvatarLoading,
  }
})(BaseSetting);
