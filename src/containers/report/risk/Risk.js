import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Court from 'components/companyHome/report/risk/Court';
import Tax from 'components/companyHome/report/risk/Tax';
import {batchReport} from 'components/hoc';

@inject('routing', 'riskStore')
@batchReport('risk')
@observer
export default class Risk extends Component {
  render() {
    return (
      <div>
        <Court />
        <Tax />
      </div>
    );
  }
}
