import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Item({name, keys, values, handle, none, unit}) {
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
  return (
    <div className={styles.wrapper}>
      <div className={styles.keys}>
        {name}
      </div>
      <div className={styles.values}>
        {handle ? handle(newValue, keys) : newValue}{unit || ''}
      </div>
    </div>
  );
}
export default observer(Item);
