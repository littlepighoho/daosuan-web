import React from 'react';
import { Modal } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { MODELS_KEYS } from '@/constant/models_keys';
import AccountPasswordSettingForm from '@/layouts/components/form/account/AccountPasswordSettingForm';


interface PasswordFormModalPropsType {
  visible: boolean;
  setVisible: (value: boolean) => void;
  dispatch: Dispatch<AnyAction>;
  accountId: string | number,
}

const modalStyle = {
  padding: '42px 42px 20px 42px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const PasswordFormModal: React.FC<PasswordFormModalPropsType> = props => {
  const {
    visible,
    setVisible,
    dispatch,
    accountId,
  } = props;

  const handleSubmit = (values: any) => {
    console.log(values);
    dispatch({
      type: MODELS_KEYS.ACCOUNT.SETTING_SAFE,
      payload: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        accountId,
      }
    });
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width={420}
      onCancel={() => setVisible(false)}
      bodyStyle={modalStyle as {}}
      destroyOnClose={true}

    >
      <AccountPasswordSettingForm onSubmit={handleSubmit}/>
    </Modal>
  )
};

export default connect((state: any) => {
  return {
    accountId: state.account.auth.loginAccountId,
  };
})(PasswordFormModal);
