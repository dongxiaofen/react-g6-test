import React from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import AlterCard from 'components/common/AlertCard';
import styles from './index.less';
function Event({timeAxisStore, riskHeadlinesStore}) {
  const {time, module, relation} = timeAxisStore.eventParams;
  return (
    <div className={styles.box}>
      <div className={styles.infoRow}>
        <span className={relation === '主体企业' ? styles.mainIcon : styles.relatedIcon}></span>
        {`${relation}-${module}（${time}）`}
      </div>
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
