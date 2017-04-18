import React, { PropTypes} from 'react';

function Col({width, offset, className, children}) {
  const cssName = className ?
    `col-md-${width} col-md-offset-${offset} ${className}` :
    `col-md-${width} col-md-offset-${offset}`;
  return (
    <div
      className={cssName}>
      {children}
    </div>
  );
}
Col.propTypes = {
  width: PropTypes.string,
  offset: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
Col.defaultProps = {
  width: '12',
  offset: '0',
  className: '',
  children: null,
};
export default Col;
