import React, { PropTypes } from 'react';

function TabPane({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
TabPane.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  reMountEveryTime: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
TabPane.defaultProps = {
  title: '',
  className: '',
  reMountEveryTime: false,
  disabled: false,
  children: null,
};
export default TabPane;
