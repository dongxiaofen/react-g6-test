import React, { Component} from 'react';
import { observer, inject } from 'mobx-react';
// import Tabs from 'antd/lib/tabs';
// const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Enterprise from 'components/companyHome/report/investment/Enterprise';

@inject('routing', 'investmentStore')
@batchReport('investmentStore')
@observer
export default class EntinvItem extends Component {
  render() {
    return (
      <Enterprise {...this.props} />
    );
  }
}
