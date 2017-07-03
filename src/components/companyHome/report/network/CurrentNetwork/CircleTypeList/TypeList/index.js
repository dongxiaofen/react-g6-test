import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
// import { toJS } from 'mobx';
import styles from './index.less';
import Checkbox from 'antd/lib/checkbox';

function TypeList({ typeList, toggleChecked, toggleCheckAll }) {
  const onChange = (label, idx, evt) => {
    console.log(`checked = ${evt.target.checked}`, label, idx);
    toggleChecked(idx);
  };
  const { allChecked, countArr, labelArr, checkedArr } = typeList;
  // console.log(toJS(countArr), toJS(labelArr), toJS(checkedArr));
  return (
    <div>
      <div className={allChecked ? styles.checkbox0Act : styles.checkbox0}>
        <Checkbox checked={allChecked} onChange={toggleCheckAll}><span className={styles.checkboxText}>主体公司</span></Checkbox>
      </div>
      {
        labelArr.map((label, idx) => {
          const checked = countArr[idx] === 0 ? false : checkedArr[idx];
          let checkboxCss = checked ? `${styles[`checkbox${idx + 1}Act`]}` : styles[`checkbox${idx + 1}`];
          checkboxCss = countArr[idx] === 0 ? styles.checkboxDisable : checkboxCss;
          return (
            <div key={label + idx} className={`${styles.checkbox} ${checkboxCss}`}>
              <Checkbox
                checked={checked}
                disabled={countArr[idx] !== 0 ? false : true}
                onChange={onChange.bind(this, label, idx)}>
                <span className={countArr[idx] === 0 ? styles.checkboxTextDisable : styles.checkboxText}>{label}（{countArr[idx]}）</span>
              </Checkbox>
            </div>
          );
        })
      }
    </div>
  );
}

TypeList.propTypes = {
  foo: PropTypes.string,
};
export default observer(TypeList);
