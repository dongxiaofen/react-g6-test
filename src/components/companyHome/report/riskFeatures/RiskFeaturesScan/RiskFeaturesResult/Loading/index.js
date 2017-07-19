import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Loading({}) {
  return (
    <div className={styles.box}>
      Loading
    </div>
  );
}

Loading.propTypes = {
  foo: PropTypes.string,
};
export default observer(Loading);
