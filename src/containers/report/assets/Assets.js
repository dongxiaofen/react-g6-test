import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Trademark from 'components/companyHome/report/assets/intangibles/Trademark';
import Patent from 'components/companyHome/report/assets/intangibles/Patent';
import Bidding from 'components/companyHome/report/assets/bidding/Bidding';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';

@inject('routing', 'assetsStore')
@batchReport('assetsStore')
@observer
export default class Assets extends Component {
  static propTypes = {
    assetsStore: PropTypes.object
  };
  render() {
    const assetsStore = this.props.assetsStore;
    return (
      <Tabs defaultActiveKey="无形资产">
        <TabPane tab="无形资产" key="无形资产">
          <Trademark trademarkInfo={assetsStore.trademarkData} isLoading={assetsStore.trLoading} />
          <Patent patentItemList={assetsStore.patentData} isLoading={assetsStore.patentLoading} />
        </TabPane>
        <TabPane tab="招投标" key="招投标">
          <Bidding biddingItemList={assetsStore.biddingData} isLoading={assetsStore.biddingLoading} />
        </TabPane>
      </Tabs>
    );
  }
}
