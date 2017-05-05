import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// import styles from './index.less';
import Checkbox from 'antd/lib/checkbox';

function TypeList({ typeList, toggleChecked, toggleCheckAll }) {
  const onChange = (label, idx, evt) => {
    console.log(`checked = ${evt.target.checked}`, label, idx);
    toggleChecked(idx);
  };
  const { allChecked, countArr, labelArr, checkedArr } = typeList;
  console.log(toJS(countArr), toJS(labelArr), toJS(checkedArr));
  return (
    <div>
      <Checkbox checked={allChecked} onChange={toggleCheckAll}>主体公司</Checkbox>
      {
        labelArr.map((label, idx) => {
          return (
            <Checkbox
              key={label + idx}
              checked={countArr[idx] === 0 ? false : checkedArr[idx]}
              disabled={countArr[idx] !== 0 ? false : true}
              onChange={onChange.bind(this, label, idx)}>
              {label}
            </Checkbox>
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
