import React from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons/lib';
import './index.scss'
interface HeaderAccountPropsType {
  className?: string,
  logined: boolean,
  account: any,
}

const HeaderAccount: React.FC<HeaderAccountPropsType> = props => {
  const {
    logined,
    account,
    className
  } = props;

  const menu = (
    <Menu>
      <Menu.Item key="center">
        <UserOutlined />
        个人中心
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        个人设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  if (logined) {
    return <Dropdown
      overlay={menu}
      placement="bottomRight"
      overlayStyle={{ width: '140px' }}
    >
      <div className={className}>
        <Avatar
          style={{ margin: '14px 8px 0 8px' }}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <div className="account-name" style={{ lineHeight: "65px" }}>121的爹</div>
      </div>
    </Dropdown>
  }
  return (
    <div className={className}>
      <Button size="default" type="default">
        <LoginOutlined />登 录
      </Button>
    </div>
  )
};

export default HeaderAccount;
