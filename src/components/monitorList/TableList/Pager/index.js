import React from 'react';
import { observer } from 'mobx-react';
import Pagination from 'components/lib/pagination';
import styles from './index.less';
function Pager() {
  const pageChange = (page) => {
    console.log(page);
  };
  return (
    <div className={styles.wrapper}>
      <Pagination
        current={1}
        pageSize={10}
        total={100}
        onChange={pageChange}
        />
    </div>
  );
}
export default observer(Pager);
