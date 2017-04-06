import React, { PropTypes} from 'react';

function Row({className, children}) {
  const cssName = className ? 'rows ' + className : 'rows';
  return (
    <div
      className={cssName}>
      {children}
    </div>
  );
}
Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
Row.defaultProps = {
  className: '',
  children: null,
};
export default Row;
