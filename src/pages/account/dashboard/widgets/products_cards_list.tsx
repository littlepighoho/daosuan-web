import React from 'react';
import { Button, Card, Empty } from 'antd';
import moment from 'moment';
import { get } from 'lodash-es';
interface ProductsCardsListPropsType {
  productData: any,
  canManage: boolean,
}

const gridStyle = {
  width: '25%',
  padding: '24px 24px ',
};

const ProductsCardsList: React.FC<ProductsCardsListPropsType> = props => {
  const {
    productData,
    canManage,
  } = props;

  return <div className="products_cards_list">
    <Card title="发布的产品" extra={canManage && <Button type="primary" >发布</Button>} >
      <CardListBody productData={productData} canManage={canManage} />
    </Card>
  </div>
};

const CardListBody = (props: { productData: any; canManage: boolean; }) => {
  const { productData, canManage } = props;
  if(get(productData, 'length', 0) !== 0) {
    return productData.map((item: any) => (
      <Card.Grid key={item.id} style={gridStyle as {}}>
        <div className="products_cards_title">
          <a>{item.title}</a>
        </div>
        <div className="products_cards_desc">
          {item.description}
        </div>
        <div className="products_cards_extra">
          <div className="extra_time">
            {moment(item.update_time).format("YYYY-MM-DD HH:mm")}
          </div>
        </div>
      </Card.Grid>
    ))
  }
  return <Empty description={canManage ? "期待你的第一个产品！" : '仍在努力中...'} />
};

export default ProductsCardsList;
