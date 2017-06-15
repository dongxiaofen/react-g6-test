import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import TimeAxisComp from 'components/companyHome/report/timeAxis';
import { batchReport } from 'components/hoc';

@inject('routing', 'monitorAxisStore', 'bannerStore')
@batchReport('monitorAxisStore')
@observer
export default class MonitorTimeAxis extends Component {
  static propTypes ={
    monitorAxisStore: PropTypes.object,
  };
  render() {
    const store = this.props.monitorAxisStore;
    return (
      <TimeAxisComp {...this.props} title="监控时间轴" timeAxisStore={store} />
    );
  }
}
