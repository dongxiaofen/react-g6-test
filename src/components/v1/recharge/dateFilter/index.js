import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import DateFilte from 'components/common/ConsumeDateFilter';
import Button from 'components/lib/button';
import styles from './index.less';

function DateFilter({consumeStore, uiStore}) {
  console.log(consumeStore.recharge.filter, 'filter---react');

  const handleFilter = () => {
    // consumeStore.getRechargeList()
    if (uiStore.uiState.rechargePager.index === 1) {
      consumeStore.getRechargeList();
    } else {
      uiStore.updateUiStore('rechargePager.index', 1);
    }
  };
  const resetSearchDate = () => {
    consumeStore.updateValue('recharge.filter.createdTsBegin', '');
    consumeStore.updateValue('recharge.filter.createdTsEnd', '');
    console.log(consumeStore.recharge.filter, 'filter---');
    if (consumeStore.recharge.mothFilter === '') {
      if (uiStore.uiState.rechargePager.index === 1) {
        consumeStore.getRechargeList();
      } else {
        uiStore.updateUiStore('rechargePager.index', 1);
      }
    } else {
      consumeStore.updateValue('recharge.mothFilter', '');
    }
  };
  return (
    <div className={styles['filter-list']}>
      <div className={styles.dateFilte}>
        <DateFilte type="recharge" handleFilter={handleFilter}/>
      </div>
      <Button className={`${styles['flt-btn']} ${styles.secondary}`} btnType="secondary" onClick={resetSearchDate}>清空</Button>
    </div>
  );
}

DateFilter.propTypes = {
  consumeStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('consumeStore', 'uiStore')(observer(DateFilter));
