import React from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AlterCard from 'components/common/AlertCard';
function Event({timeAxisStore, riskHeadlinesStore}) {
  console.log(timeAxisStore.eventData);
  return (
    <div style={{marginTop: '30px'}}>
      <AlterCard
        module="timeAxis"
        data={timeAxisStore.eventData.events}
        store={riskHeadlinesStore}/>
    </div>
  );
}

export default inject('riskHeadlinesStore')(loadingComp({
  mapDataToProps: props => ({
    loading: props.timeAxisStore.eventData.events === undefined ? true : false,
    error: props.timeAxisStore.eventData.error,
    module: '时间轴事件',
    height: 100,
  }),
})(observer(Event)));
