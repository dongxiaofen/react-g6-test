import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';

@inject('stockStore', 'routing')
@batchReport('stock')
@observer
export default class Stock extends Component {
  static propTypes = {
    stockStore: PropTypes.object,
  }
  render() {
    return (
      <Tabs defaultActiveKey="公司概况">
        <TabPane tab="公司概况" key="公司概况">
          this is 公司概况
        </TabPane>
        <TabPane tab="公告列表" key="公告列表">
          this is 公司概况
        </TabPane>
      </Tabs>
    );
  }
}
