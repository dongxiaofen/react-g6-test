import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { RangePicker, MonthPicker } = DatePicker;
const { Option } = Select;
import FilterContainer from 'components/common/FilterContainer';
import styles from './index.less';

function SelectDate({consumptionStore}) {
  const filterData = consumptionStore.filterData;
  const start = filterData.begin ? moment(filterData.begin, 'YYYY-MM-DD') : '';
  const end = filterData.end ? moment(filterData.end, 'YYYY-MM-DD') : '';
  const handleDateChange = (data) => {
    consumptionStore.updateValue('filterData.begin', moment(data[0]).format('YYYY-MM-DD'));
    consumptionStore.updateValue('filterData.end', moment(data[1]).format('YYYY-MM-DD'));
  };
  const handleTypeChange = (value) => {
    consumptionStore.updateValue('filterData.type', value);
  };
  const handleMonthChange = (data) => {
    const isLeapYear = moment(data).isLeapYear();
    const month = moment(data).month() + 1;
    const year = moment(data).year();
    const dayMonth31 = [1, 3, 5, 7, 8, 10, 12];
    let _begin = '';
    let _end = '';
    _begin = `${year}-${month}-01`;
    if (dayMonth31.indexOf(month) >= 0) {
      _end = `${year}-${month}-31`;
    } else if (month === 2) {
      _end = isLeapYear ? `${year}-${month}-29` : `${year}-${month}-28`;
    } else {
      _end = `${year}-${month}-30`;
    }
    consumptionStore.updateValue('filterData.begin', _begin);
    consumptionStore.updateValue('filterData.end', _end);
  };
  return (
    <div className={styles.dateTime}>
      <FilterContainer title="订单日期" titleStyle={{paddingLeft: '10px'}}>
        <div>
          <span style={{ marginRight: 20 }}>
            <Select
              defaultValue={filterData.type}
              onChange={handleTypeChange}
              size="small"
              style={{ width: '90px' }}>
              <Option value="month">月份选择</Option>
              <Option value="date">区间选择</Option>
            </Select>
          </span>
          {
            filterData.type === 'date' ?
            <RangePicker
              style={{width: '200px'}}
              allowClear={false}
              value={[start, end]}
              onChange={handleDateChange}/> :
            <span>
              <MonthPicker
                style={{width: '90px'}}
                allowClear={false}
                onChange={handleMonthChange}
                placeholder="选择月份" />
              {filterData.begin ? <span className={styles.selectDate}>已选日期：{filterData.begin} ~ {filterData.end}</span> : ''}
            </span>
          }
        </div>
      </FilterContainer>
    </div>
  );
}

SelectDate.propTypes = {
  consumptionStore: PropTypes.object,
};
export default inject('consumptionStore')(observer(SelectDate));
