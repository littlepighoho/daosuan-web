import React from 'react';
import { List, Skeleton, Avatar } from 'antd';
import './index.scss';
import { get } from 'lodash-es';
import { resourceUrl } from '@/utils/resource_helper';
import { UserOutlined } from '@ant-design/icons';
import Router from 'umi/router';

interface FollowingListPropsType {
  list: [],
  loading: boolean,

}

const FollowingList: React.FC<FollowingListPropsType> = props => {
  const {
    list,
    loading
  } = props;
  const renderList = () => {
    if(!list) return [];
    return list;
  };
  const handleAccountClick = (id: string | number | null) => {
    if(id) {
      Router.push(`/account/${id}/profile`);

    }
  };
  return (
    <div className="following_list">
      <List
        itemLayout="horizontal"
        dataSource={renderList()}
        renderItem={item => (
          <List.Item
          >
            <Skeleton avatar title={true} loading={loading} active>
              <List.Item.Meta
                avatar={
                  get(item, 'avator', '') === '' ?
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> : <Avatar
                    src={resourceUrl(get(item, 'avator', ''))}
                    icon
                  />
                }
                title={<span className="list_item_title" onClick={() => handleAccountClick(get(item, 'id', null))}>{get(item, 'nickname', '')}</span>}
                description={get(item, 'motto', '')}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FollowingList;
