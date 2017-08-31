import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import DateFilte from '../../filter/dateFilte';
import styles from './index.less';

function DateFilter({consumeStore, uiStore}) {
  const handleFilter = () => {
    // consumeStore.getRechargeList()
    if (uiStore.uiState.rechargePager.index === 1) {
      consumeStore.getRechargeList();
    } else {
      uiStore.updateUiStore('rechargePager.index', 1);
    }
  };
  return (
    <div className={styles['filter-list']}>
      <DateFilte type="recharge" handleFilter={handleFilter}/>
    </div>
  );
}

DateFilter.propTypes = {
  consumeStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('consumeStore', 'uiStore')(observer(DateFilter));
