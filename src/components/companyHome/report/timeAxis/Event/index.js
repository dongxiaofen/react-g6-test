import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
function Event({timeAxisStore}) {
  console.log(timeAxisStore.eventData);
  return (
    <div>
      Event
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.timeAxisStore.eventData.events === undefined ? true : false,
    error: props.timeAxisStore.eventData.error,
    height: 100,
  }),
})(observer(Event));
