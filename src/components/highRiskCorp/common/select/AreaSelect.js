import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'components/lib/Select';
const Option = Select.Option;
import cityName from 'helpers/cityName';
import styles from './index.less';
function AreaSelect({highRiskCorpStore, module, onChange}) {
  const selectValue = highRiskCorpStore[module].params.area;
  const createOption = () => {
    const output = [];
    output.push(
      <Option value="全部" key="全国">
        全国
      </Option>
    );
    cityName.map((item, key) => {
      output.push(
        <Option value={item} key={key}>
          {item}
        </Option>
      );
    });
    return output;
  };
  const selectChange = (value) => {
    const params = Object.assign({}, highRiskCorpStore[module].params, {area: value});
    highRiskCorpStore.changeValue(`${module}.params.area`, value);
    onChange(params);
  };
  return (
    <div className={styles.selectLine}>
      <span className={styles.label}>地区</span>
      <Select
        width="100px"
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

export default inject('highRiskCorpStore')(observer(AreaSelect));
