import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Scale({}) {
  return (
    <div className={styles.box}>
      Scale
    </div>
  );
}

Scale.propTypes = {
  foo: PropTypes.string,
};
export default observer(Scale);
