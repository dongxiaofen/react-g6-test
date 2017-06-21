import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function KeyValue({match, keys, values}) {
  const handleVlaue = (value) => {
    if (value === undefined) {
      return '无';
    }
    return value.toString();
  };
  return (
    <div className={styles.keys}>
      {keys}
      <span
        className={match ? styles.blueValue : styles.greyValue}
        title={values && values.length > 20 ? values : ''}
      >
        {match ? handleVlaue(values) : '-'}
      </span>
    </div>
  );
}

KeyValue.propTypes = {
  match: PropTypes.bool
};
export default observer(KeyValue);
