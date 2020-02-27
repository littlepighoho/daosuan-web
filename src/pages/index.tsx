/**
 * Created by romchung on 2020-01-30.
 *
 */

import React from 'react';
import './index.scss';
import { Button, Typography} from 'antd';
import LogoImg from '../assets/img/daosuanlogo.png';
import router from 'umi/router';
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import QueueAnim from 'rc-queue-anim';

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
            <Texty
              delay={300}
              type="mask-bottom"
              mode="smooth"
            >
              DAO SUAN
            </Texty>
            <p style={{ fontSize: '46px', fontWeight: 200, textAlign: 'left', margin: '16px 0 8px'}}>
              <Texty
                delay={1000}
                duration={300}
                type="mask-bottom"
                mode="smooth"
              >
              A Material Market That Know You Best
              </Texty>
            </p>
              <p style={{ fontSize: '22px', fontWeight: 200, textAlign: 'left', margin: '0px'}}>
                <Texty
                  delay={3000}
                  duration={300}
                  type="mask-bottom"
                  mode="smooth"
                >
                  提供最丰富、受欢迎的中间件 轮子 脚手架
                </Texty>
              </p>
          </Title>
          <QueueAnim
            type="left"
            delay={300}
            duration={300}
          >
          <div key="motion-button">
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
          </QueueAnim>
        </div>
        <div className="right-logo">
          <img src={LogoImg} height={500} />
        </div>
      </div>
    </div>
  );
};

export default IndexView;
