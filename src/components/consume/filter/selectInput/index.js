import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import Input from 'components/lib/input';
// import { Select } from 'antd';
// const Option = Select.Option;
import Select from 'components/lib/Select';
const Option = Select.Option;
import FilterContainer from '../filterContainer';
import styles from './index.less';

function SelectInput({consumeStore}) {
  const selectInputTarget = consumeStore.consumption.selectInputTarget;
  const filterData = consumeStore.consumption.filter;
  const handleInput = (evt) => {
    consumeStore.updateValue(`consumption.filter.${selectInputTarget}`, evt.target.value);
  };
  const handleSelect = (value) => {
    consumeStore.updateValue('consumption.selectInputTarget', value);
    if (value === 'id') {
      consumeStore.updateValue(`consumption.filter.sdkApiRecordParams`, '');
    } else {
      consumeStore.updateValue(`consumption.filter.id`, '');
    }
  };
  const selectCont = (
    <Select
      value={selectInputTarget}
      width="80px"
      onChange={handleSelect}
      >
      <Option value="id">订单编号</Option>
      <Option value="sdkApiRecordParams">查询参数</Option>
    </Select>
  );
  return (
    <FilterContainer title={selectCont}>
      <div className={styles.inputBox}>
        <Input
          id={selectInputTarget}
          type="text"
          value={filterData[selectInputTarget]}
          onChange={handleInput}
          autoComplete={false}
          className={styles['flt-input']}
          />
      </div>
    </FilterContainer>
  );
}

SelectInput.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumeStore')(observer(SelectInput));
