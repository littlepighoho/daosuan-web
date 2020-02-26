import React, { useState } from 'react';
import { Typography, List } from 'antd';
import PasswordFormModal from '@/components/modal/PasswordFormModal';

const { Title } = Typography;

// 安全信息
interface SafeSettingPropsType {
  accountInfo: any,
}

const listData = [{
  key: 'password',
  title: '账户密码',
}, {
  key: 'email',
  title: '账户邮箱',
}];

const SafeSetting:React.FC<SafeSettingPropsType> = props => {
  const {
    accountInfo,
  } = props;

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const renderItemDesc = (item: any) => {
    let result = '';
    if (item.key === 'email') {
      result =  '当前绑定邮箱: ' + accountInfo.email;
    } else if(item.key === 'password') {
      result = '当前密码强度: 强'
    }
    return result;
  };

  const handleItemClick = (value: string) => () => {
    switch (value) {
      case 'password': {
        setPasswordModalVisible(true);
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
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[<a key={`edit_${item.key}`} onClick={handleItemClick(item.key)}>修改</a>]}
          >
            <List.Item.Meta
              title={item.title}
              description={renderItemDesc(item) as string}
            />
          </List.Item>
        )}
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
