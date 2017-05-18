import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import TimeAxisComp from 'components/companyHome/report/timeAxis';
import { batchReport } from 'components/hoc';

@inject('routing', 'timeAxisStore')
@batchReport('timeAxis')
@observer
export default class TimeAxis extends Component {
  render() {
    return (
      <TimeAxisComp {...this.props} />
    );
  }
}
