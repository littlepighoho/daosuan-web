import React from 'react';
import { Result, Button } from 'antd';
import router from 'umi/router';
const Result404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的地址有误"
      extra={<Button type="primary" onClick={() => router.push('/')}>返回首页</Button>}
    />
  )
}

export default Result404;
