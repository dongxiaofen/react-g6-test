import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FilterTotal({filterSheet, page, searchKeyFilter}) {
  // total
  let totalNumDom = '';
  let totalText = '找到约';
  if (page.totalElements > 0 && page.totalNum > 0 && page.totalElements === page.totalNum) {
    totalText = '找到';
  }
  if (page.totalNum > 0) {
    totalNumDom = (
      <div className={styles.totalCon}>
        {totalText}
        <span className={styles.findNum}>
          {page.totalNum}
        </span>
        条结果
      </div>
    );
  }
  // search
  let searchKey = '';
  if (page.totalElements > 0 && filterSheet.data.length > 0) {
    searchKey = (
      <div className={styles.searchKeyFilter}>
        <span>{searchKeyFilter}</span>
        搜索
      </div>
    );
  }
  return (
    <div className={`${styles.wrap}`}>
      {searchKey}
      {totalNumDom}
      <div className={styles.noResult}>
        没有想要的结果？提供关键词
      </div>
    </div>
  );
}

FilterTotal.propTypes = {
  filterSheet: PropTypes.object,
  page: PropTypes.object,
  searchKeyFilter: PropTypes.string,
};
export default observer(FilterTotal);
