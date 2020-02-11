import React from 'react';
import { Card } from 'antd';

interface ProductsCardsListPropsType {

}

const gridStyle = {
  width: '25%',
  padding: '24px 24px ',
};

const ProductsCardsList: React.FC<ProductsCardsListPropsType> = props => {
  return <div className="products_cards_list">
    <Card title="发布的产品" extra={<a href="#">更多</a>} >
      <Card.Grid style={gridStyle as {}}>
        <div className="products_cards_title">
          <a>牛逼的轮子</a>
        </div>
        <div className="products_cards_desc">
          这是一个很牛逼的轮子
        </div>
        <div className="products_cards_extra">
          <div className="extra_time">
            2019-12-24
          </div>
        </div>
      </Card.Grid>
    </Card>
  </div>
};

export default ProductsCardsList;
