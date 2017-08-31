import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
import FilterContainer from '../filterContainer';
import styles from './index.less';

function DateFliter({consumeStore, type, handleFilter}) {
  const filterData = consumeStore[type].filter;
  const start = filterData.createdTsBegin ? moment(filterData.createdTsBegin, 'YYYY-MM-DD') : filterData.createdTsBegin;
  const end = filterData.createdTsEnd ? moment(filterData.createdTsEnd, 'YYYY-MM-DD') : filterData.createdTsEnd;
  const handleDateChange = (data) => {
    // console.log(data, 'data');
    consumeStore.updateValue(`${type}.filter.createdTsBegin`, data[0].format('YYYY-MM-DD'));
    consumeStore.updateValue(`${type}.filter.createdTsEnd`, data[1].format('YYYY-MM-DD'));
    consumeStore.updateValue(`${type}.mothFilter`, '');
    if (handleFilter) {
      handleFilter();
    }
  };
  return (
    <div className={styles.dateTime}>
      <FilterContainer title="订单日期" titleStyle={{paddingLeft: '10px'}}>
        <RangePicker
          value={[start, end]}
          onChange={handleDateChange}
          />
      </FilterContainer>
    </div>
  );
}

DateFliter.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumeStore')(observer(DateFliter));
