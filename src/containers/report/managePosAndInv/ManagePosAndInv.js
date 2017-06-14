import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;

import Investment from 'components/companyHome/report/posAndInv/Investment';
import LegalPerson from 'components/companyHome/report/posAndInv/LegalPerson';
import Office from 'components/companyHome/report/posAndInv/Office';

@inject('routing', 'investmentStore')
@batchReport('investmentStore')
@observer
export default class ManagePosAndInv extends Component {
  render() {
    return (
      <Tabs tab="董监高对外投资任职">
        <TabPane tab="董监高对外投资任职" key="涉诉资产">
          <Investment {...this.props}/>
          <LegalPerson {...this.props}/>
          <Office {...this.props}/>
        </TabPane>
      </Tabs>
    );
  }
}
