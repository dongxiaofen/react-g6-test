import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import BannerBody from './BannerBody';

@inject('bannerStore', 'routing', 'companyHomeStore')
@observer
export default class Banner extends Component {
  static propTypes = {
    routing: PropTypes.object,
    bannerStore: PropTypes.object,
    companyHomeStore: PropTypes.object,
  };
  componentDidMount() {
    const {companyName} = this.props.routing.location.query;
    const {monitorId} = this.props.companyHomeStore.reportInfo;
    this.props.bannerStore.getBannerInfo({companyName});
    this.props.bannerStore.getReportInfo();
    if (monitorId !== '') {
      this.props.bannerStore.getMonitorRepInfo();
    }
  }
  render() {
    return (
      <BannerBody />
    );
  }
}
