import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'components/lib/Select';
const Option = Select.Option;
import styles from './index.less';
function TimeSelect({highRiskCorpStore, module, yearSelect, rangeSelect, onChange}) {
  const selectValue = highRiskCorpStore[module].params.timeRange;
  const timeSelect = module === 'enterpriseIncrement' ? yearSelect : rangeSelect;
  const createOption = () => {
    const output = [];
    timeSelect.map((item, key) => {
      output.push(
        <Option
          key={key}
          optionStyle={{fontSize: '16px'}}
          actOptionStyle={{fontSize: '16px', color: '#fff', background: '#3483e9'}}
          value={item.value} >
          {item.key}
        </Option>
      );
    });
    return output;
  };
  const selectChange = (value) => {
    const params = Object.assign({}, highRiskCorpStore[module].params, {timeRange: value});
    highRiskCorpStore.changeValue(`${module}.params.timeRange`, value);
    onChange(params);
  };
  return (
    <Select
      width="90px"
      className={styles.selectBoxNoLine}
      defaultValue={selectValue}
      onChange={selectChange}
      value={selectValue}
      noIcon
      >
      {createOption()}
    </Select>
  );
}
TimeSelect.defaultProps = {
  rangeSelect: [
    {key: '近一个月', value: '近一个月'},
    {key: '近三个月', value: '近三个月'},
    {key: '近半年', value: '近半年'},
    {key: '近一年', value: '近一年'},
    {key: '全部', value: '全部'},
  ],
  yearSelect: [
    {key: '2017年', value: '2017'},
    {key: '2016年', value: '2016'},
    {key: '2015年', value: '2015'},
    {key: '2014年', value: '2014'},
    {key: '2013年', value: '2013'},
  ],
};
export default inject('highRiskCorpStore')(observer(TimeSelect));
