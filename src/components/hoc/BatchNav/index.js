import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

function hoc() {
  return (WrappedComponent) => {
    class BatchNav extends Component {
      static propTypes = {
        routing: PropTypes.object,
        headerStore: PropTypes.object,
      };
      componentDidMount() {
        const pathname = this.props.routing.location.pathname;
        this.props.headerStore.routeChangeNav(pathname);
      }
      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }
    return inject('headerStore', 'routing')(observer(BatchNav));
  };
}
export default hoc;
