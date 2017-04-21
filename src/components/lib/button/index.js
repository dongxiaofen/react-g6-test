import React, { PropTypes } from 'react';
import styles from './index.less';

function Button({ btnType, className, loading, disabled, children, onClick, ...props }) {
  const clickHandle = (evt) => {
    if (loading || disabled) {
      return false;
    }
    onClick(evt);
  };
  let cssName = styles[btnType];
  if (disabled) {
    cssName = styles.disabled;
  } else if (loading) {
    cssName += ` ${styles.loading}`;
  }
  if (className) {
    cssName += ` ${className}`;
  }
  return (
    <button
      {...props}
      className={cssName}
      onClick={clickHandle}
      >
      {children}
      {loading && <i style={{marginLeft: '5px'}} className="anticon anticon-spin anticon-loading"></i>}
    </button>
  );
}
Button.propTypes = {
  btnType: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
Button.defaultProps = {
  btnType: 'default',
  loading: false,
  disabled: false,
};
export default Button;
