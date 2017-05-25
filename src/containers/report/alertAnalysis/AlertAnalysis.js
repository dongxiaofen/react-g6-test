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
      const { monitorId, analysisReportId } = this.props.routing.location.query;
      this.props.alertAnalysisStore.getAlertAnalysisList(monitorId, analysisReportId);
      this.props.alertAnalysisStore.getSixStar(monitorId);
    }
  }

  componentWillUnmount() {
    const alertAnalysisStore = this.props.alertAnalysisStore;
    const alertCancel = alertAnalysisStore.alertCancel;
    if (alertCancel && typeof alertCancel === 'function') {
      alertCancel();
    }
    alertAnalysisStore.changeValue('loadingId', -1);
  }

  render() {
    return (
      <div>
        <AlertAnalysisBody />
      </div>
    );
  }
}
