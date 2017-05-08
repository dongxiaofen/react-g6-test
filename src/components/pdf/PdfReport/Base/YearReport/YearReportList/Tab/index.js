import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Tab({dataSingle}) {
  return (
    <div className={styles.year}>
      {dataSingle.year}
    </div>
  );
}

Tab.propTypes = {
  dataSingle: PropTypes.object,
};
export default observer(Tab);
