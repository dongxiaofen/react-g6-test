import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'components/lib/Select';
const Options = Select.Options;
import industryConf from 'helpers/industry';
import styles from './index.less';
function IndustrySelect({highRiskCorpStore, module, areaChange, industrySelect, onChange}) {
  const selectValue = highRiskCorpStore[module].params.industry;
  const createOption = () => {
    const output = [];
    industrySelect.map((item, key) => {
      output.push(
        <Options value={item.value} key={key}>
          {item.key}
        </Options>
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
      <span className={styles.label}>地区</span>
      <Select
        className={styles.industrySelect}
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
export inject('highRiskCorpStore')(observer(IndustrySelect));
