import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function DetailTitle({}) {
  return (
    <div className={styles.title}></div>
  );
}

DetailTitle.propTypes = {
  foo: PropTypes.string,
};
export default observer(DetailTitle);
