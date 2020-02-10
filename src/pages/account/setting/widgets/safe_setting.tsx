import React from 'react';
import { Typography, List } from 'antd';

const { Title } = Typography;

// 安全信息
interface SafeSettingPropsType {
  accountInfo: any,
}

const SafeSetting:React.FC<SafeSettingPropsType> = props => {
  const {
    accountInfo,
  } = props;
  const listData = [{
    key: 'password',
    title: '账户密码',
  }, {
    key: 'email',
    title: '账户邮箱',
  }];
  const renderItemDesc = (item: any) => {
    let result = '';
    if (item.key === 'email') {
      result =  '当前绑定邮箱: ' + accountInfo.email;
    } else if(item.key === 'password') {
      result = '当前密码强度: 强'
    }
    return result;
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
            actions={[<a key={`edit_${item.key}`}>修改</a>]}
          >
            <List.Item.Meta
              title={item.title}
              description={renderItemDesc(item) as string}
            />
          </List.Item>
        )}
      >

      </List>
    </React.Fragment>
  )
};

export default SafeSetting;
