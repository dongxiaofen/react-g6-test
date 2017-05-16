import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Score({score}) {
  return (
    <span className={styles.box}>综合分{score}</span>
  );
}

Score.propTypes = {
  score: PropTypes.string,
};
export default observer(Score);
