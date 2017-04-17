import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MonitorStatisticsGetData from 'components/monitorStatistics/MonitorStatisticsGetData';

@observer
export default class MonitorStatistics extends Component {
  render() {
    return (
      <div>
        <MonitorStatisticsGetData />
      </div>
    );
  }
}
