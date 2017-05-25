import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
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
  const newRemain = Number(remainValue);
  return (
    <div className={styles.wrapper}>
      <div className={styles.keys}>
        {name}
      </div>
      <div className={styles.values}>
        {handle ? handle(newValue, keys) : `${!Remaining ? `${newValue} ${unit}` : ''}`}
        {/* {newValue !== '- -' && unit || ''} */}
        {feeset && Remaining ? ` ${isNaN(newRemain) ? 0 : newRemain} ${unit}` : ''}
      </div>
    </div>
  );
}
export default observer(Item);
