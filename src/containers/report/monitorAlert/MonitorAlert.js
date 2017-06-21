import React, { Component, PropTypes} from 'react';
import { inject, observer } from 'mobx-react';
import AlertAnalysisBody from 'components/companyHome/report/AlertAnalysis';
import { batchReport } from 'components/hoc';
@inject('monitorAlertStore')
@batchReport('monitorAlertStore')
@observer
export default class MonitorAlert extends Component {
  static propTypes = {
    routing: PropTypes.object,
    monitorAlertStore: PropTypes.object,
  };
  componentWillUnmount() {
    this.props.monitorAlertStore.cancelAlertDetail();
  }
  render() {
    return (
      <div>
        <AlertAnalysisBody dataStore={this.props.monitorAlertStore}/>
      </div>
    );
  }
}
