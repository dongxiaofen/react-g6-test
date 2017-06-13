import React, { Component } from 'react';
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
  render() {
    return (
      <Tabs>
        <TabPane tab="股权相关" key="股权相关">
          <EquityFreeze {...this.props}/>
          <SharePledge {...this.props}/>
          <EquityTransfer {...this.props}/>
        </TabPane>
      </Tabs>
    );
  }
}
