import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import FilterContainer from '../filterContainer';
import { Select } from 'antd';
const Option = Select.Option;
// import styles from './index.less';

function SelectType({consumeStore}) {
  const handleChange = (value) => {
    if (value === 'all') {
      consumeStore.updateValue('consumption.filter.permissionClassification', '');
    } else {
      consumeStore.updateValue('consumption.filter.permissionClassification', value);
    }
  };
  const createOption = () => {
    const data = Object.keys(consumeStore.interfaceType);
    return data.map((key, idx) => {
      return <Option key={idx} value={key}>{consumeStore.interfaceType[key]}</Option>;
    });
  };
  return (
    <FilterContainer title="接口类别" titleStyle={{paddingLeft: '10px'}}>
      <Select placeholder="请选择接口类别" style={{ width: 190 }} onChange={handleChange} value={consumeStore.consumption.filter.permissionClassification ? consumeStore.consumption.filter.permissionClassification : 'all'}>
        {createOption()}
        <Option key="all" value={'all'}>全部</Option>
      </Select>
    </FilterContainer>
  );
}

SelectType.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumeStore')(observer(SelectType));
