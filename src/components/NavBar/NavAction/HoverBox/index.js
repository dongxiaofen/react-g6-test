import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function HoverBox({ width, left, children }) {
  const style = {
    width: width,
    left: left
  };
  return (
    <div className={styles.hoverBox} style={style}>
      <div className={styles.arrowBox}>
        <div className={styles.arrow}></div>
      </div>
      {children}
    </div>
  );
}

HoverBox.propTypes = {
  width: PropTypes.oneOfType([PropTypes.nubmer, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.nubmer, PropTypes.string]),
  children: PropTypes.node,
};
export default observer(HoverBox);
