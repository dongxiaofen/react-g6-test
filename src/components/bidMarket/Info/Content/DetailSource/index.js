import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function DetailSource({}) {
  return (
    <div className={styles}>
      this is soruce
    </div>
  );
}

DetailSource.propTypes = {
  foo: PropTypes.string,
};
export default observer(DetailSource);
