import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import AlertAnalysisBody from 'components/companyHome/report/AlertAnalysis';
@inject('routing', 'alertAnalysisStore')
@observer
export default class AlertAnalysis extends Component {
  static propTypes = {
    routing: PropTypes.object,
    alertAnalysisStore: PropTypes.object,
  };
  componentDidMount() {
    if (!this.props.alertAnalysisStore.isMount) {
      const { deepMonitorId, monitorId, analysisReportId } = this.props.routing.location.query;
      this.props.alertAnalysisStore.getAlertAnalysisList(monitorId, analysisReportId);
      this.props.alertAnalysisStore.getSixStar(deepMonitorId);
    }
  }
  render() {
    return (
      <AlertAnalysisBody />
    );
  }
}
