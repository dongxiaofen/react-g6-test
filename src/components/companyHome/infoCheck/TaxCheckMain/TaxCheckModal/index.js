import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'components/lib/input';
import Select from 'components/lib/Select';
const Option = Select.Option;
import styles from './index.less';

function TaxCheckModal({taxCheckStore}) {
  const selectConf = taxCheckStore.selectConf;
  const addSelectItem = () => {
    taxCheckStore.addSelectItem();
  };
  const deleteSelectItem = (index) => {
    taxCheckStore.deleteSelectItem(index);
  };
  const selectChange = (index, key, value) => {
    taxCheckStore.changeValue(`selectConf[${index}].${key}`, value);
  };
  const inputChange = (index, evt) => {
    const inputValue = evt.target.value.replace(/[^\d.]/g, '');
    taxCheckStore.changeValue(`selectConf[${index}].input`, inputValue);
  };
  const generateSelect = () => {
    return selectConf.map((item, idx) => {
      return (
        <div key={idx} className={styles.selectGroup}>
          <span className={styles.yearLabel}>年度</span>
          <Select
            width="80px"
            onChange={selectChange.bind(null, idx, 'year')}
            value={item.year}>
            <Option value="2016">2016</Option>
            <Option value="2015">2015</Option>
          </Select>
          <span className={styles.taxLabel}>指标</span>
          <Select
            width="170px"
            onChange={selectChange.bind(null, idx, 'taxIndex')}
            value={item.taxIndex}>
            <Option value="A类某某某">A类某某某</Option>
          </Select>
          <span className={styles.inputLabel}>金额（元）</span>
          <Input
            className={styles.inputCss}
            inputType="singleline"
            onChange={inputChange.bind(null, idx)}
            value={item.input}
            placeholder="请填写" />
          {taxCheckStore.selectConf.length > 1 && <span className={styles.minusIcon} onClick={deleteSelectItem.bind(null, idx)}></span>}
        </div>
      );
    });
  };
  return (
    <div className={styles.wrap}>
      {generateSelect()}
      {taxCheckStore.selectConf.length < 6 && <button className={styles.addBtn} onClick={addSelectItem}>添加核查项</button>}
    </div>
  );
}

export default inject('taxCheckStore')(observer(TaxCheckModal));
