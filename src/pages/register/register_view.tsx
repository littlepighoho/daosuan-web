import React, { useState } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { Steps, Result, Button, Typography } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

import RegisterForm from '@/components/form/account/RegisterForm';
import './register_view.scss';
import { MODELS_KEYS } from '@/constant/models_keys';

const { Step } = Steps;
const { Title } = Typography;
const steps = [
  {
    title: '填写信息',
  },
  {
    title: '完成',
  },
];

interface RegisterViewPropsType {
  dispatch: Dispatch<AnyAction>;
  registerLoading: boolean,

}

const RegisterView: React.FC<RegisterViewPropsType> = (props) => {

  const {
    dispatch,
    registerLoading,
  } = props;

  const [ currentStep, setCurrentStep ] = useState(0);
  const [ checkNickname, setCheckNickname ] = useState(false);
  const handleRegisterSubmit = (values: any) => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.REGISTER,
      payload: {
        username: values.email,
        password: values.password,
        nickname: values.nickname,
        token: values.token,
      },
      callback: () => {
        setCurrentStep(1);
      }
    });
  };
  const handleSendEmail = (email: string) => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.SEND_EMAIL,
      payload: {
        email,
      }
    })
  }
  const handleCheckNickname = (nickname: string) => {
    dispatch({
      type: MODELS_KEYS.ACCOUNT.CHECK_NICKNAME,
      payload: {
        nickname: nickname,
      },
      callback: (result: boolean) => {
        setCheckNickname(result);
      }
    })
  };

  return (
    <div className="register-view">
      <div className="register-content">
          <div className="register-steps">
            <Title level={2}>注册</Title>
          </div>
        {currentStep === 0 ? <RegisterForm
          onCheckNickname={handleCheckNickname}
          checkNickname={checkNickname}
          onSubmit={handleRegisterSubmit}
          registerLoading={registerLoading}
          onSendEmail={handleSendEmail}
        /> : <Result
          status="success"
          title="加入成功"
          subTitle="恭喜你！现在你已经成为了我们的一员了！希望你可以在这里有巨大的收获！"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => router.push('/')}
            >
              返回首页
            </Button>,
          ]}
        />}
      </div>
    </div>
  );

};

export default connect(({ account, loading }: any) => ({
  registerLoading: loading.effects[MODELS_KEYS.ACCOUNT.REGISTER],
}))(RegisterView);
