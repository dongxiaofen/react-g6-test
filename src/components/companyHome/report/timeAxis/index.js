import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import Axis from './Axis';
import Event from './Event';

function TimeAxis() {
  return (
    <div>
      <ModuleTitle module="事件时间轴" />
      <Axis />
      <Event />
    </div>
  );
}

export default observer(TimeAxis);
