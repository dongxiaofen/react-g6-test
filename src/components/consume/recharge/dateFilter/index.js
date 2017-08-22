import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import DateFilte from '../../filter/dateFilte';
import styles from './index.less';

function DateFilter({consumeStore}) {
  return (
    <div className={styles['filter-list']}>
      <DateFilte type="recharge" handleFilter={consumeStore.getRechargeList}/>
    </div>
  );
}

DateFilter.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumeStore')(observer(DateFilter));
