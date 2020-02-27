import React, { useState } from 'react';
import { Tabs, Empty, Spin } from 'antd';
const { TabPane } = Tabs;


interface TabsListPropsType {
  starsData: any,
  canManage: boolean,
}

const TabsList: React.FC<TabsListPropsType> = props => {
  const {
    starsData,
    canManage
  } = props;

  const [currentTab, setCurrentTab] = useState("star_products");

  const handleTabChange = (key: any) => {
    console.log(key);
    setCurrentTab(key);
  };

  return (
    <div className="tabs_list" >
      <Spin spinning={!starsData}>
        <Tabs activeKey={currentTab} onChange={handleTabChange}>
          <TabPane tab="关注的产品" key="star_products" >
            <Empty />
          </TabPane>
          <TabPane tab="文章" key="document">
            <Empty />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  )
};

export default TabsList;
