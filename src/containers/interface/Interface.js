import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import MainContBox from 'components/common/MainContBox';

@inject('headerStore', 'routing')
@observer
export default class Interface extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    routing: PropTypes.object,
    headerStore: PropTypes.object,
  };
  componentDidMount() {
    const pathname = this.props.routing.location.pathname;
    this.props.headerStore.routeChangeNav(pathname);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
