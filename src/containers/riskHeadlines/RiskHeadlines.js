import React, { Component } from 'react';
import { observer } from 'mobx-react';
import RiskMain from 'components/riskHeadlines/RiskMain';
@observer
export default class RiskHeadlines extends Component {
  render() {
    return (
      <div>
        <RiskMain />
      </div>
    );
  }
}
