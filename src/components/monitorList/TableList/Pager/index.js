import React from 'react';
import { observer } from 'mobx-react';
import Pagination from 'components/lib/pagination';
import styles from './index.less';
function Pager({monitorListStore, uiStore}) {
  const pageChange = (page) => {
    monitorListStore.changeParams({
      index: page,
    });
    monitorListStore.getMainList();
  };
  const {index, size, totalElements} = uiStore.uiState.monitorList.params;
  return (
    <div className={styles.wrapper}>
      <Pagination
        current={index}
        pageSize={size}
        total={totalElements}
        onChange={pageChange}
        />
    </div>
  );
}
export default observer(Pager);
