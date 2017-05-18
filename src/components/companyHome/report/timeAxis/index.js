import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import Axis from './Axis';
import Event from './Event';

function TimeAxis(props) {
  return (
    <div>
      <ModuleTitle module="事件时间轴" />
      <Axis {...props} />
      <Event {...props} />
    </div>
  );
}

export default observer(TimeAxis);
