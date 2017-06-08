import React, { Component, PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import Tax from 'components/companyHome/report/risk/Tax';
import {batchReport} from 'components/hoc';

@inject('routing', 'riskStore')
@batchReport('risk')
@observer
export default class RiskTax extends Component {
  static propTypes = {
    riskStore: PropTypes.object
  };
  render() {
    const riskStore = this.props.riskStore;
    return (
      <Tax riskStore={riskStore}/>
    );
  }
}
