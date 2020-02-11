import React, { useState } from 'react';
import { Tabs, Empty } from 'antd';
const { TabPane } = Tabs;


interface TabsListPropsType {

}

const TabsList: React.FC<TabsListPropsType> = props => {

  const [currentTab, setCurrentTab] = useState("star_products");
  const handleTabChange = (key: any) => {
    console.log(key);
    setCurrentTab(key);
  };
  return (
    <div className="tabs_list" >
      <Tabs activeKey={currentTab} onChange={handleTabChange}>
        <TabPane tab="关注的产品" key="star_products" >
          <Empty />
         </TabPane>
        <TabPane tab="文章" key="document">
          <Empty />
        </TabPane>

      </Tabs>
    </div>
  )
};

export default TabsList;
