import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'components/lib/Select';
const Options = Select.Options;
import styles from './index.less';
function RegCapSelect({highRiskCorpStore, module, timeSelect, onChange}) {
  const selectValue = highRiskCorpStore[module].params.timeRange;
  const createOption = () => {
    const output = [];
    timeSelect.map((item, key) => {
      output.push(
        <Options
          key={key}
          optionStyle={{fontSize: '16px'}}
          actOptionStyle={{fontSize: '16px', color: '#fff', background: '#3483e9'}}
          value={item.value} >
          {item.key}
        </Options>
      );
    });
    return output;
  };
  const selectChange = (value) => {
    const params = Object.assign({}, highRiskCorpStore[module].params, {timeRange: value});
    highRiskCorpStore.changeValue(`${module}.params.timeRange`, value);
    onChange(params);
  }
  return (
    <div className={styles.selectLine}>
      <span className={styles.label}>地区</span>
      <Select
        className={styles.selectBox}
        defaultValue={selectValue}
        onChange={selectChange}
        value={selectValue}
        >
        {createOption()}
      </Select>
    </div>
  );
}
RegCapSelect.defaultProps = {
  timeSelect: [
    {key: '近一个月', value: '近一个月'},
    {key: '近三个月', value: '近三个月'},
    {key: '近半年', value: '近半年'},
    {key: '近一年', value: '近一年'},
    {key: '全部', value: '全部'},
  ],
};
export inject('highRiskCorpStore')(observer(RegCapSelect));
