import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import loadingComp from 'components/hoc/LoadingComp';
import EquityFreeze from 'components/companyHome/report/equityRela/EquityFreeze';
import SharePledge from 'components/companyHome/report/equityRela/SharePledge';
import EquityTransfer from 'components/companyHome/report/equityRela/EquityTransfer';

@inject('routing', 'MortageStore')
@batchReport('MortageStore')
@loadingComp({
  mapDataToProps: props => ({
    loading: props.MortageStore.isLoading,
    error: false,
    module: '股权相关'
  })
})
@observer
export default class EquityRela extends Component {
  static propTypes = {
    MortageStore: PropTypes.object,
  }
  render() {
    const MortageStore = this.props.MortageStore;
    const {
      sharesFrostListCount,
      sharesImpawnListCount,
      sharesTransferListCount
    } = MortageStore;
    let defaultActiveKey = '股权冻结';
    if (sharesFrostListCount === 0) {
      defaultActiveKey = '股权质押';
    }
    if (sharesImpawnListCount === 0) {
      defaultActiveKey = '股权转让';
    }
    if (sharesTransferListCount === 0) {
      defaultActiveKey = '股权冻结';
    }
    return (
      <Tabs defaultActiveKey={defaultActiveKey}>
        <TabPane tab={`股权冻结（${sharesFrostListCount}）`}
          key="股权冻结"
          disabled={ sharesFrostListCount > 0 ? false : true}>
          <EquityFreeze {...this.props}/>
        </TabPane>
        <TabPane tab={`股权质押（${sharesImpawnListCount}）`}
          key="股权质押"
          disabled={ sharesImpawnListCount > 0 ? false : true}>
          <SharePledge {...this.props}/>
        </TabPane>
        <TabPane tab={`股权转让（${sharesTransferListCount}）`}
          key="股权转让"
          disabled={ sharesTransferListCount > 0 ? false : true}>
          <EquityTransfer {...this.props}/>
        </TabPane>
      </Tabs>
    );
  }
}
