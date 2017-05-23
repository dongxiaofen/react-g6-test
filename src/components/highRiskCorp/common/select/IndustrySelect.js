import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'components/lib/Select';
const Option = Select.Option;
import industryConf from 'helpers/industry';
import styles from './index.less';
function IndustrySelect({highRiskCorpStore, module, industrySelect, onChange}) {
  const selectValue = highRiskCorpStore[module].params.industry;
  const createOption = () => {
    const output = [];
    industrySelect.map((item, key) => {
      output.push(
        <Option value={item.value} key={key}>
          {item.key}
        </Option>
      );
    });
    return output;
  };
  const selectChange = (value) => {
    const params = Object.assign({}, highRiskCorpStore[module].params, {industry: value});
    highRiskCorpStore.changeValue(`${module}.params.industry`, value);
    onChange(params);
  };
  return (
    <div className={styles.selectLine}>
      <span className={styles.label}>行业</span>
      <Select
        width="130px"
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
function convertIndutry(data) {
  return data.map(option => {
    return {key: option, value: option};
  });
}
IndustrySelect.defaultProps = {
  industrySelect: [{key: '全部', value: '全部'}].concat(convertIndutry(industryConf)),
};
export default inject('highRiskCorpStore')(observer(IndustrySelect));
