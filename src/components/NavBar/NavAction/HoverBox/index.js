import React, {PropTypes} from 'react';
import styles from './index.less';

function HoverBox({ width, left, children }) {
  const style = {
    width: width,
    left: left
  };
  return (
    <div className={styles.hoverBox} style={style}>
      {children}
    </div>
  );
}

HoverBox.propTypes = {
  width: PropTypes.string,
  left: PropTypes.string,
  children: PropTypes.node,
};
export default HoverBox;
