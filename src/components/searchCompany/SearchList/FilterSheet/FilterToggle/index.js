import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FilterToggle({}) {
  return (
    <div className={`${styles.wrap}`}>
      FilterToggle
    </div>
  );
}

FilterToggle.propTypes = {
  foo: PropTypes.string,
};
export default observer(FilterToggle);
