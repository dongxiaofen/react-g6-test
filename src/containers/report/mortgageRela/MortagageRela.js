import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;

// @inject('routing', 'investmentStore')
// @batchReport('investmentStore')
@observer
export default class ManagePosAndInv extends Component {
  render() {
    return (
      <Tabs tab="股权冻结">
        <TabPane tab="董监高对外投资任职" key="涉诉资产">
          fdsa
        </TabPane>
      </Tabs>
    );
  }
}
