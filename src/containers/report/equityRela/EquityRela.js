import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import EquityFreeze from 'components/companyHome/report/equityRela/EquityFreeze';
import SharePledge from 'components/companyHome/report/equityRela/SharePledge';
import EquityTransfer from 'components/companyHome/report/equityRela/EquityTransfer';

@inject('routing', 'MortageStore')
@batchReport('MortageStore')
@observer
export default class EquityRela extends Component {
  static propTypes = {
    MortageStore: PropTypes.object,
  }
  render() {
    let EquityFreezeCount = 0;
    let SharePledgeCount = 0;
    let EquityTransferCount = 0;
    const MortageStore = this.props.MortageStore;
    if (MortageStore.sharesFrostList.content && MortageStore.sharesFrostList.content.length > 0) {
      EquityFreezeCount = MortageStore.sharesFrostList.content.length;
    }
    if (MortageStore.sharesImpawnList.content && MortageStore.sharesImpawnList.content.length > 0) {
      SharePledgeCount = MortageStore.sharesImpawnList.content.length;
    }
    if (MortageStore.sharesTransferList.content && MortageStore.sharesTransferList.content.length > 0) {
      EquityTransferCount = MortageStore.sharesTransferList.content.length;
    }
    return (
      <Tabs defaultActiveKey="股权冻结">
        <TabPane tab={`股权冻结（${EquityFreezeCount}）`}
          key="股权冻结">
          <EquityFreeze {...this.props}/>
        </TabPane>
        <TabPane tab={`股权质押（${SharePledgeCount}）`}
          key="股权质押">
          <SharePledge {...this.props}/>
        </TabPane>
        <TabPane tab={`股权转让（${EquityTransferCount}）`}
          key="股权转让">
          <EquityTransfer {...this.props}/>
        </TabPane>
      </Tabs>
    );
  }
}
