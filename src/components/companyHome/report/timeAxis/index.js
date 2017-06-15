import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import Axis from './Axis';
import Event from './Event';

function TimeAxis(props) {
  return (
    <div style={{margin: '-5px 10px 0 10px'}}>
      <ModuleTitle module={props.title} />
      <Axis {...props} />
      <ModuleTitle module="时间轴事件详情" />
      <Event {...props} />
    </div>
  );
}

export default observer(TimeAxis);
