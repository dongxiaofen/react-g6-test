import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import BannerBody from './BannerBody';

@inject('bannerStore', 'routing')
@observer
export default class Banner extends Component {
  static propTypes = {
    routing: PropTypes.object,
    bannerStore: PropTypes.object,
  };
  componentDidMount() {
    const {companyName} = this.props.routing.location.query;
    this.props.bannerStore.getBannerInfo({companyName});
    this.props.bannerStore.getReportInfo();
    this.props.bannerStore.getMonitorRepInfo();
  }
  render() {
    return (
      <BannerBody />
    );
  }
}
