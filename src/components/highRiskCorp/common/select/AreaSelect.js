import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'components/lib/Select';
const Options = Select.Options;
import cityName from 'helpers/cityName';
import styles from './index.less';
function AreaSelect({highRiskCorpStore, module, onChange}) {
  const selectValue = highRiskCorpStore[module].params.area;
  const createOption = () => {
    const output = [];
    output.push(
      <Options value="全部">
        全国
      </Options>
    );
    cityName.map((item, key) => {
      output.push(
        <Options value={item} key={key}>
          {item}
        </Options>
      );
    });
    return output;
  };
  const selectChange = (value) => {
    const params = Object.assign({}, highRiskCorpStore[module].params, {area: value});
    highRiskCorpStore.changeValue(`${module}.params.area`, value);
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

export inject('highRiskCorpStore')(observer(AreaSelect));
