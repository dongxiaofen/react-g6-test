import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Select from 'components/lib/Select';
const Option = Select.Option;
import styles from './index.less';

function DateSelect({consumeStore, type}) {
  const handleSelect = (value) => {
    consumeStore.updateValue(`${type}.mothFilter`, value);
  };
  const createOption = () => {
    const timeArr = [
      {name: '最近一年订单', value: 'year'},
      {name: '最近六个月订单', value: 'six'},
      {name: '最近三个月订单', value: 'three'},
      {name: '最近两个月订单', value: 'two'},
      {name: '最近一个月订单', value: 'one'},
    ];
    return timeArr.map(({name, value}) => {
      return (<Option key={value} value={value}>{name}</Option>);
    });
  };
  return (
    <div className={styles['date-select']}>
      <div className={styles['main-cont']}>
        <Select
          placeholder="订单日期"
          value={consumeStore[type].mothFilter}
          width="130px"
          onChange={handleSelect}
          >
          {createOption()}
        </Select>
      </div>
    </div>
  );
}

DateSelect.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumeStore')(observer(DateSelect));
