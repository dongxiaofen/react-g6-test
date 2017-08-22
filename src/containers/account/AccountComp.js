import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import MainContBox from 'components/common/MainContBox';

// @inject('headerStore', 'routing')
@observer
export default class Account extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    // routing: PropTypes.object,
    // headerStore: PropTypes.object,
  };
  // componentDidMount() {
  //   const pathname = this.props.routing.location.pathname;
  //   // console.log(pathname, 'pathname');
  //   this.props.headerStore.routeChangeNav(pathname);
  // }
  render() {
    return (
      <MainContBox>
        {this.props.children}
      </MainContBox>
    );
  }
}
