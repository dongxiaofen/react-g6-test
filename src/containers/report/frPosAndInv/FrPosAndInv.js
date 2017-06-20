import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import Tabs from 'antd/lib/tabs';
// const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Investment from 'components/companyHome/report/investment/Investment';
import Office from 'components/companyHome/report/investment/Office';

@inject('routing', 'investmentStore')
@batchReport('investmentStore')
@observer
export default class FrPosAndInv extends Component {
  render() {
    return (
      <div>
        <Investment {...this.props} />
        <Office {...this.props} />
      </div>
    );
  }
}
