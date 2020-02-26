import React from 'react';
import { Modal } from 'antd';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import LoginForm from '@/components/form/account/LoginForm';
import { MODELS_KEYS } from '@/constant/models_keys';


interface LoginFormModalPropsType {
  visible: boolean;
  setVisible: (value: boolean) => void;
  dispatch: Dispatch<AnyAction>;
  loginLoading: boolean,
}

const modalStyle = {
  padding: '24px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const LoginFormModal: React.FC<LoginFormModalPropsType> = props => {

  const {
    visible,
    setVisible,
    loginLoading,
    dispatch
  } = props;

  const handleLogin = (values: any) => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.LOGIN,
      payload: { ...values },
    })
  };
  return (
    <Modal
      visible={visible}
      closable={false}
      footer={null}
      width={420}
      onCancel={() => setVisible(false)}
      bodyStyle={modalStyle as {}}
    >
      <h1>
        捣蒜
      </h1>
      <div style={{ fontSize: '14px', color: 'grey', marginBottom: '1.5em'}}>
        最懂你的地方
      </div>
      <LoginForm onLogin={handleLogin} loginLoading={loginLoading} />
    </Modal>
  );


};

export default connect(({ loading }: any) => ({
  loginLoading: loading.models.account,
}))(LoginFormModal);
