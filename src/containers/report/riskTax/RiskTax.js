import React, { Component } from 'react';
import { observer, inject} from 'mobx-react';
import TaxInfo from 'components/companyHome/report/riskTax';
import {batchReport} from 'components/hoc';

@inject('routing', 'riskTaxStore')
@batchReport('riskTaxStore')
@observer
export default class RiskTax extends Component {
  render() {
    return (
      <TaxInfo {...this.props} />
    );
  }
}
