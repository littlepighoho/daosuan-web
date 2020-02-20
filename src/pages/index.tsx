/**
 * Created by romchung on 2020-01-30.
 *
 */

import React from 'react';
import './index.scss';
import { Button, Typography} from 'antd';
import LogoImg from '../assets/img/daosuanlogo.png';
import router from 'umi/router';

const { Title } = Typography;

const IndexView = () => {
  const handleButtonClick = (key: string) => () => {
    switch (key) {
      case 'market': {
        router.push('/market');
        break;
      }
      case 'community': {
        router.push('/community');
        break;
      }
    }
  };
  return (
    <div className="index-view-content">
      <div className="content-body">
        <div className="left-info">
          <Title style={{ fontWeight: 'bold', fontSize: '52px', marginBottom: '64px'}}>
            DAO SUAN
            <p style={{ fontSize: '46px', fontWeight: 200, textAlign: 'left', margin: '16px 0 8px'}}>
              A Material Market That Know You Best
            </p>
            <p style={{ fontSize: '22px', fontWeight: 200, textAlign: 'left', margin: '0px'}}>
              提供最丰富、受欢迎的中间件 轮子 脚手架
            </p>
          </Title>
          <div>
            <Button
              type="primary"
              style={{ marginRight: '28px' }}
              // size="large"
              onClick={handleButtonClick('market')}
            >
              物料市场
            </Button>
            <Button
              // size="large"
              style={{ width: '96px' }}
              onClick={handleButtonClick('community')}

            >
              社区
            </Button>
          </div>
        </div>
        <div className="right-logo">
          <img src={LogoImg} height={500} />
        </div>
      </div>
    </div>
  );
};

export default IndexView;
