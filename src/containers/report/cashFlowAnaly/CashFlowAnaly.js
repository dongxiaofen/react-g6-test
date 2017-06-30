import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CashFlowAnalyBody from 'components/companyHome/report/CashFlowAnaly';

@observer
export default class CashFlowAnaly extends Component {
  render() {
    return (
      <div>
        <CashFlowAnalyBody />
      </div>
    );
  }
}
