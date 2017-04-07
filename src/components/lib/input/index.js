import React, { PropTypes } from 'react';
import styles from './index.less';
function Input({ inputType, className, ...props }) {
  let cssName = styles[inputType];
  if (className) {
    cssName += ` ${className}`;
  }
  return (
    <input
      {...props}
      className={cssName}
      />
  );
}
Input.propTypes = {
  inputType: PropTypes.string,
  className: PropTypes.string,
};
Input.defaultProps = {
  inputType: 'default',
};
export default Input;
