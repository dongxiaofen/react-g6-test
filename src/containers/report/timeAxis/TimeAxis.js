import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TimeAxisComp from 'components/companyHome/report/timeAxis';

@observer
export default class TimeAxis extends Component {
  render() {
    return (
      <TimeAxisComp />
    );
  }
}
