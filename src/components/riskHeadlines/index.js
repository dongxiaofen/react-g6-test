import React, { Component } from 'react';
import { observer } from 'mobx-react';
import RiskFilter from './RiskFilter';
@observer
export default class RiskMain extends Component {
  render() {
    return (
      <div>
        <RiskFilter />
      </div>
    );
  }
}
