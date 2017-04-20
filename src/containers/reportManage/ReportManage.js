import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ReportMain from 'components/reportManage';

@observer
export default class ReportManage extends Component {
  render() {
    return (
      <ReportMain />
    );
  }
}
