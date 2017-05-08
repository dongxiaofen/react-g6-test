import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function DetailTitle({}) {
  return (
    <div className={styles.title}>失信被执行人记录</div>
  );
}

DetailTitle.propTypes = {
  foo: PropTypes.string,
};
export default observer(DetailTitle);
