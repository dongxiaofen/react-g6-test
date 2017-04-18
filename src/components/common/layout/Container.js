import React, { PropTypes } from 'react';

function Container({id, className, children}) {
  const cssName = className ?
  'container ' + className :
  'container';
  return (
    <div
      id={id}
      className={cssName}
      >
      {children}
    </div>
  );
}
Container.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
Container.defaultProps = {
  id: '',
  className: '',
  children: null,
};
export default Container;
