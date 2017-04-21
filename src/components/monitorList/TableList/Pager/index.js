import React from 'react';
import { observer } from 'mobx-react';
import Pagination from 'components/lib/pagination';
import styles from './index.less';
function Pager({monitorListStore}) {
  const pageChange = (page) => {
    monitorListStore.changeParams({
      index: page,
    });
    monitorListStore.getMainList();
  };
  const {index, size} = monitorListStore.searchParams;
  const totalElements = monitorListStore.mainList.totalElements || 10;
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
