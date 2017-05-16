import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'components/lib/Select';
const Option = Select.Option;
import styles from './index.less';
function RegCapSelect({highRiskCorpStore, module, regCapSelect, onChange}) {
  const selectValue = highRiskCorpStore[module].params.regCap;
  const createOption = () => {
    const output = [];
    regCapSelect.map((item, key) => {
      output.push(
        <Option value={item.value} key={key}>
          {item.key}
        </Option>
      );
    });
    return output;
  };
  const selectChange = (value) => {
    const params = Object.assign({}, highRiskCorpStore[module].params, {regCap: value});
    highRiskCorpStore.changeValue(`${module}.params.regCap`, value);
    onChange(params);
  };
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
  regCapSelect: [
    {key: '小于50万', value: '小于50万'},
    {key: '50-200万', value: '50-200万'},
    {key: '200-500万', value: '200-500万'},
    {key: '500-1000万', value: '500-1000万'},
    {key: '1000-5000万', value: '1000-5000万'},
    {key: '5000万以上', value: '5000万以上'},
    {key: '全部', value: '全部'},
  ],
};
export default inject('highRiskCorpStore')(observer(RegCapSelect));
