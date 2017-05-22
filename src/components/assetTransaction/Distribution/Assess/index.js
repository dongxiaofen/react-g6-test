import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Assess({}) {
  return (
    <div className={styles}>
      this is assess
    </div>
  );
}

Assess.propTypes = {
  foo: PropTypes.string,
};
export default observer(Assess);
