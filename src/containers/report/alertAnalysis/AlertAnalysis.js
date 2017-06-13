import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import AlertAnalysisBody from 'components/companyHome/report/AlertAnalysis';
import { batchReport } from 'components/hoc';
@inject('routing', 'alertAnalysisStore')
@batchReport('alertAnalysisStore')
@observer
export default class AlertAnalysis extends Component {
  static propTypes = {
    routing: PropTypes.object,
    alertAnalysisStore: PropTypes.object,
  };
  render() {
    return (
      <div>
        <AlertAnalysisBody dataStore={this.props.alertAnalysisStore}/>
      </div>
    );
  }
}
