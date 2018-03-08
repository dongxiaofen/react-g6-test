import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import FilterContainer from 'components/common/FilterContainer';
import Select from 'components/lib/Select';
const Option = Select.Option;
import styles from './index.less';

function SelectType({consumptionStore}) {
  const handleC1Change = (value) => {
    if (value === 'all') {
      consumptionStore.updateValue('interfaceType.c1.current', '');
    } else {
      consumptionStore.updateValue('interfaceType.c1.current', value);
      consumptionStore.getAssortmentC2(value);
    }
    consumptionStore.updateValue('interfaceType.c2.current', '');
  };
  const handleC2Change = (value) => {
    if (value === 'all') {
      consumptionStore.updateValue('interfaceType.c2.current', '');
    } else {
      consumptionStore.updateValue('interfaceType.c2.current', value);
    }
  };
  const createOption = (listData) => {
    // const assortmentC1 = consumptionStore.interfaceType.c1.list;
    const output = [];
    output.push(<Option key="all" value="all">全部</Option>);
    if (listData.length > 0) {
      listData.map((item, idx) => {
        output.push(<Option key={idx} value={item.id}>{item.name}</Option>);
      });
    }
    return output;
  };
  const assortmentC1 = consumptionStore.interfaceType.c1;
  const assortmentC2 = consumptionStore.interfaceType.c2;
  return (
    <FilterContainer title="接口类别" titleStyle={{paddingLeft: '10px'}}>
      <Select
        placeholder="请选择接口类别"
        width="150px"
        onChange={handleC1Change}
        className={styles.select}
        value={assortmentC1.current ? assortmentC1.current : 'all'}>
        {createOption(assortmentC1.list)}
      </Select> <Select
        placeholder="请选择接口类别"
        width="150px"
        onChange={handleC2Change}
        className={styles.select}
        value={assortmentC2.current ? assortmentC2.current : 'all'}>
        {createOption(assortmentC2.list)}
      </Select>
    </FilterContainer>
  );
}

SelectType.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumptionStore')(observer(SelectType));
