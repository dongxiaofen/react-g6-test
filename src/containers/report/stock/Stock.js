import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';

import Brief from 'components/companyHome/report/stock/Brief';
import ShareHolder from 'components/companyHome/report/stock/ShareHolder';
import CirculateShareHolder from 'components/companyHome/report/stock/CirculateShareHolder';
import Management from 'components/companyHome/report/stock/Management';

@inject('stockStore', 'routing')
@batchReport('stock')
@observer
export default class Stock extends Component {
  static propTypes = {
    stockStore: PropTypes.object,
  }
  render() {
    const stockStore = this.props.stockStore;
    return (
      <Tabs defaultActiveKey="公司概况">
        <TabPane tab="公司概况" key="公司概况">
          <Brief
            brief={stockStore.brief}
            isEmptyObject={stockStore.isEmptyObject}
            isLoading={stockStore.isLoading}/>
          <ShareHolder
            shareHolder={stockStore.shareHolder}
            isEmptyObject={stockStore.isEmptyObject}
            isLoading={stockStore.isLoading}/>
          <CirculateShareHolder
            circulateShareHolder={stockStore.circulateShareHolder}
            isEmptyObject={stockStore.isEmptyObject}
            isLoading={stockStore.isLoading}/>
          <Management
            management={stockStore.management}
            isLoading={stockStore.isLoading}/>
        </TabPane>
        <TabPane tab="公告列表" key="公告列表">
          this is 公司概况
        </TabPane>
      </Tabs>
    );
  }
}
