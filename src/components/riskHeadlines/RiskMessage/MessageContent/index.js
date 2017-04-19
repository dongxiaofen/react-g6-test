import React from 'react';
import { observer } from 'mobx-react';
import AlterCard from 'components/common/AlertCard';
import styles from './index.less';
import Pagination from 'components/lib/pagination';
import loadingComp from 'components/hoc/LoadingComp';
function MessageContent({riskHeadlinesStore, contentHeight}) {
  const filterParams = riskHeadlinesStore.filterParams;
  const events = riskHeadlinesStore.events;
  const pageChange = (index) => {
    riskHeadlinesStore.riskUpdateValue('events', 'params.index', index);
    const {from, to} = filterParams;
    const params = events.params;
    params.from = from;
    params.to = to;
    const monitorId = events.info.monitorId;
    riskHeadlinesStore.getCompanyEvents(monitorId, params);
  };
  const moduleData = events.data.content;
  const totalElements = events.data.totalElements;
  const params = events.params;
  const height = contentHeight - 270;
  return (
    <div className={styles.wrap}>
      <div className={styles.mesWrap} style={{height: height}}>
        {
          moduleData ?
          <AlterCard
            index={params.index}
            module="headLine"
            data={moduleData}
            reducerData={events}
            store={riskHeadlinesStore}/>
          : ''
        }
      </div>
       <div className={totalElements > 10 ? styles.page : styles.none}>
        <div className={styles.page}>
          <Pagination
            current={params.index}
            pageSize={Number(params.size)}
            total={totalElements}
            onChange={pageChange}
            showTotal={total => `共 ${total} 条`} />
        </div>
      </div>
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.riskHeadlinesStore.events.data.content ? false : true,
    error: props.riskHeadlinesStore.events.data.error,
    category: 2,
    imgCategory: 7,
    errCategory: false,
  }),
})(observer(MessageContent));
