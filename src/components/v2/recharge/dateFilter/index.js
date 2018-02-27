import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import FilterContainer from 'components/common/FilterContainer';
import Button from 'components/lib/button';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import styles from './index.less';

function DateFilter({rechargeStore, uiStore}) {
  const handleFilter = () => {
    if (uiStore.uiState.rechargeV2Pager.index === 1) {
      rechargeStore.getRechargeList();
    } else {
      uiStore.updateUiStore('rechargeV2Pager.index', 1);
    }
  };
  const handleDateChange = (data) => {
    const start = data[0].format('YYYY-MM-DD');
    const end = data[1].format('YYYY-MM-DD');
    rechargeStore.updateValue('filter.createdTsBegin', start);
    rechargeStore.updateValue('filter.createdTsEnd', end);
    handleFilter();
  };
  const resetSearchDate = () => {
    rechargeStore.resertFilter();
    handleFilter();
  };
  const getDefaultVal = () => {
    const {createdTsBegin, createdTsEnd} = rechargeStore.filter;
    const start = createdTsBegin ? moment(createdTsBegin) : '';
    const end = createdTsEnd ? moment(createdTsEnd) : '';
    return [start, end];
  };
  return (
    <div className={styles['filter-list']}>
      <div className={styles.dateFilte}>
        <FilterContainer title="订单日期" titleStyle={{paddingLeft: '10px'}}>
          <RangePicker
            value={getDefaultVal()}
            onChange={handleDateChange}
            allowClear={false}
            />
        </FilterContainer>
      </div>
      <Button className={`${styles['flt-btn']} ${styles.secondary}`} btnType="secondary" onClick={resetSearchDate}>清空</Button>
    </div>
  );
}

DateFilter.propTypes = {
  rechargeStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default inject('rechargeStore', 'uiStore')(observer(DateFilter));
