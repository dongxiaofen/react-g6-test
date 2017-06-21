import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import TimeAxisComp from 'components/companyHome/report/timeAxis';
import { batchReport } from 'components/hoc';

@inject('routing', 'reportAxisStore', 'bannerStore')
@batchReport('reportAxisStore')
@observer
export default class ReportTimeAxis extends Component {
  static propTypes ={
    reportAxisStore: PropTypes.object,
  };
  render() {
    const store = this.props.reportAxisStore;
    return (
      <TimeAxisComp {...this.props} title="历史时间轴" timeAxisStore={store} />
    );
  }
}
