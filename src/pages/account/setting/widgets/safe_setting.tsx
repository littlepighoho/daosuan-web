import React, { useState, useEffect } from 'react';
import { Typography, List } from 'antd';
import PasswordFormModal from '@/components/modal/PasswordFormModal';

const { Title } = Typography;

// 安全信息
interface SafeSettingPropsType {
  accountInfo: any,
  bindGithubAccount: () => void;
  unbindOauthAccount: () => void;
}

const listData = [{
  key: 'password',
  title: '账户密码',
}, {
  key: 'email',
  title: '账户邮箱',
}, {
  key: 'github',
  title: 'Github',
}];

const SafeSetting:React.FC<SafeSettingPropsType> = props => {
  const {
    accountInfo,
    bindGithubAccount,
    unbindOauthAccount,
  } = props;

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const renderItemDesc = (item: any) => {
    let result = '';
    if (item.key === 'email') {
      result = accountInfo.email === "" ? '当前暂未绑定邮箱': ('当前绑定邮箱: ' + accountInfo.email);
    } else if(item.key === 'password') {
      result = '当前密码强度: 强'
    } else if(item.key === 'github') {
      result = accountInfo.oauth[2] === undefined ? '当前暂未绑定Github' : ('当前绑定Github: ' + accountInfo.oauth["2"]);
    }
    return result;
  };
  const renderActionText = (item: any) => {
    let result;
    if (item.key === 'email') {
      result = accountInfo.email === "" ? '绑定': '更换';
    } else if(item.key === 'password') {
      result = '修改';
    } else if(item.key === 'github') {
      result = accountInfo.oauth[2] === undefined ? '绑定' : '解绑';
    }
    return result;
  };

  const handleItemClick = (value: string) => () => {
    switch (value) {
      case 'password': {
        setPasswordModalVisible(true);
        break;
      }
      case 'github': {
        if(accountInfo.oauth[2] === undefined) {
          bindGithubAccount()
        } else {
          unbindOauthAccount()
        }
        break;
      }
    }
  };
  return (
    <React.Fragment>
      <Title level={3}>
        安全设置
      </Title>
      <List
        header={null}
        footer={null}
        dataSource={listData}
        size="large"
        renderItem={(item: any) => {
          return (<List.Item
            key={item.key}
            actions={[<a key={`edit_${item.key}`} onClick={handleItemClick(item.key)}>{renderActionText(item)}</a>]}
          >
            <List.Item.Meta
              title={item.title}
              description={renderItemDesc(item) as string}
            />
          </List.Item>)
        }}
      >
      </List>
      <PasswordFormModal
        setVisible={setPasswordModalVisible}
        visible={passwordModalVisible}
      />
    </React.Fragment>
  )
};

export default SafeSetting;
