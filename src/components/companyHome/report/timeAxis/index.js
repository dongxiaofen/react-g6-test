import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import Axis from './Axis';
import Event from './Event';

function TimeAxis(props) {
  const {time, module, relation} = props.timeAxisStore.eventParams;
  return (
    <div>
      <ModuleTitle module="时间轴" />
      <Axis {...props} />
      <ModuleTitle module={time ? `${time}事件（${module} - ${relation}）` : '事件'} />
      <Event {...props} />
    </div>
  );
}

export default observer(TimeAxis);
