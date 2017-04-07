import React, { PropTypes } from 'react';
import styles from './index.less';
function Title({children}) {
  return (
    <h1
      className={styles.titleCss}
      >
      {children}
    </h1>
  );
}
Title.propTypes = {
  children: PropTypes.node,
};
export default Title;
