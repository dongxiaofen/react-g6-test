import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import BlackListScanBody from 'components/companyHome/report/BlackListScan';

@inject('companyHomeStore', 'blackListScanStore')
@observer
export default class BlackListScan extends Component {
  static propTypes = {
    companyHomeStore: PropTypes.object,
    blackListScanStore: PropTypes.object,
  };
  componentDidMount() {
    const { isMounted } = this.props.blackListScanStore;
    if (!isMounted) {
      const { reportId } = this.props.companyHomeStore.reportInfo;
      const moduleStore = this.props.blackListScanStore;
      moduleStore.getStatus(reportId);
      // moduleStore.scanMain(reportId);
      // moduleStore.scanRelated(reportId);
      // moduleStore.scanNetwork(reportId);
    }
  }
  render() {
    const { reportId } = this.props.companyHomeStore.reportInfo;
    return <BlackListScanBody reportId={reportId} />;
  }
}
