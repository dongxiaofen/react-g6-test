import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NavBar({}) {
  return (
    <div className={styles}>
      this is NavBar
    </div>
  );
}

NavBar.propTypes = {
  foo: PropTypes.string,
};
export default observer(NavBar);
