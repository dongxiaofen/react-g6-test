import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AlertAnalysisBody from 'components/companyHome/report/AlertAnalysis';

@observer
export default class AlertAnalysis extends Component {
  render() {
    return (
      <AlertAnalysisBody />
    );
  }
}
