import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'components/lib/tabs';
import Trademark from 'components/companyHome/report/assets/bidding/Trademark';
import Patent from 'components/companyHome/report/assets/bidding/Patent';
import Bidding from 'components/companyHome/report/assets/bidding/Bidding';
import { batchReport } from 'components/hoc';

const TabPane = Tabs.TabPane;

@inject('routing', 'assetsStore', 'uiStore')
@batchReport('assets')
@observer
export default class Assets extends Component {
  static propTypes = {
    assetsStore: PropTypes.object
  };
  render() {
    const assetsStore = this.props.assetsStore;
    return (
      <Tabs>
        <TabPane tab="无形资产/招投标">
          <Trademark trademarkInfo={assetsStore.trademarkData}
                     isLoading={assetsStore.trLoading}
                     error={false}
          />
          <Patent patentItemList={assetsStore.patentData} isLoading={assetsStore.patentLoading} />
          <Bidding isLoading={assetsStore.biddingLoading} />
        </TabPane>
      </Tabs>
    );
  }
}
