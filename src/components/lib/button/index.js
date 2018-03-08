import React, { PropTypes } from 'react';
import styles from './index.less';

function Button({ btnType, className, loading, disabled, children, onClick, width, ...props }) {
  const clickHandle = (evt) => {
    if (loading || disabled) {
      return false;
    }
    if (onClick) {
      onClick(evt);
    }
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
      style={{ width: width }}
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
  width: PropTypes.number,
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
