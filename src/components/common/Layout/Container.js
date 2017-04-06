import React, { PropTypes } from 'react';

function Container({id, className, children}) {
  return (
    <div
      id={id}
      className={className}
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
  className: 'container',
  children: null,
};
export default Container;
