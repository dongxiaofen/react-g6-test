import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Rank({}) {
  return (
    <div className={styles}>
      this is rank
    </div>
  );
}

Rank.propTypes = {
  foo: PropTypes.string,
};
export default observer(Rank);
