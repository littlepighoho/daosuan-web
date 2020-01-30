/**
 * Created by romchung on 2020-01-30.
 *
 */

import React from 'react';
import './index.scss';


const BasicLayout: React.FC = props => {
  return (
    <div className="normal">
      <h1 className="title">Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
