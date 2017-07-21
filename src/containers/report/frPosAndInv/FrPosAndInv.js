import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
// import Tabs from 'antd/lib/tabs';
// const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Investment from 'components/companyHome/report/investment/frInvesAndPos/Investment';
import Office from 'components/companyHome/report/investment/frInvesAndPos/Office';
import FrOffice from 'components/companyHome/report/investment/frInvesAndPos/FrOffice';
@inject('routing', 'investmentStore')
@batchReport('investmentStore')
@observer
export default class FrPosAndInv extends Component {
  render() {
    return (
      <div>
        <FrOffice {...this.props} />
        <Investment {...this.props} />
        <Office {...this.props} />
      </div>
    );
  }
}
