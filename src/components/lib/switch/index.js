import React, { PropTypes } from 'react';
import styles from './index.less';
function Switch({ status, loading, disabled, onChange }) {
  const toggleStatus = () => {
    if (!disabled && !loading) {
      onChange(!status);
    }
  };
  const iConPos = status ? {left: '15px'} : {left: '0px'};
  let boxClass = status ? styles.openBox : styles.closeBox;
  boxClass = disabled ? styles.disableBox : boxClass;
  let iconClass = status ? styles.openIcon : styles.closeIcon;
  iconClass = disabled ? styles.disableIcon : iconClass;
  let output;
  if (loading) {
    output = (
      <div className={styles.spinBox}>
        <i className={'fa fa-spin fa-spinner ' + styles.loading}></i>
      </div>
    );
  } else {
    output = (
      <div className={boxClass} onClick={toggleStatus}>
        <span style={iConPos} className={iconClass}></span>
      </div>
    );
  }
  return output;
}
Switch.propTypes = {
  status: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
Switch.defaultProps = {
  status: false,
  loading: false,
  disabled: false,
};
export default Switch;
