import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import FilterContainer from 'components/common/FilterContainer';
import Select from 'components/lib/Select';
const Option = Select.Option;
import styles from './index.less';

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
    const output = [];
    output.push(<Option key="all" value="all">全部</Option>);
    if (data.length > 0) {
      data.map((key) => {
        output.push(<Option key={key} value={key}>{consumeStore.interfaceType[key]}</Option>);
      });
    }
    return output;
  };
  return (
    <FilterContainer title="接口类别" titleStyle={{paddingLeft: '10px'}}>
      <Select
        placeholder="请选择接口类别"
        width="190px"
        onChange={handleChange}
        className={styles.select}
        value={consumeStore.consumption.filter.permissionClassification ? consumeStore.consumption.filter.permissionClassification : 'all'}>
        {createOption()}
      </Select>
    </FilterContainer>
  );
}

SelectType.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumeStore')(observer(SelectType));
