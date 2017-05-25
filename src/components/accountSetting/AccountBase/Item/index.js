import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
function Item({name, keys, values, handle, none, unit, feeset, remainValue, Remaining}) {
  const formatValue = () => {
    if (values === '' || values === undefined) {
      return '- -';
    }
    return values;
  };
  const newValue = formatValue();
  if (none) {
    return null;
  }
  const cutLength = (value, _unit) => {
    if (!Remaining) {
      if (value.toString().length > 4) {
        return (<Popover content={`${value} ${_unit}`}>
          {`${value.toString().slice(0, 4)}.. ${_unit}` }
        </Popover>);
      }
      return (<span>{`${value} ${_unit}`}</span>);
    }
    return null;
  };

  const newRemain = Number(remainValue);
  return (
    <div className={name === '剩余点数' ? styles.wrapperEnd : styles.wrapper}>
      <div className={styles.keys}>
        {name}
      </div>
      <div className={styles.values}>
        {handle ? handle(newValue, keys) : cutLength(newValue, unit)}
        {/* {newValue !== '- -' && unit || ''} */}
        {feeset && Remaining ? ` ${isNaN(newRemain) ? 0 : newRemain} ${unit}` : ''}
      </div>
    </div>
  );
}
export default observer(Item);
