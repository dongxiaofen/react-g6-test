import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import ForceNetwork from 'components/companyHome/report/forceNetwork/ForceNetwork';
import { withRouter } from 'react-router';

@inject('routing', 'forceNetworkStore')
@batchReport('forceNetwork')
@withRouter
@observer
export default class ForceNetworkContainer extends Component {
  static propTypes = {
    forceNetworkStore: PropTypes.object,
    router: PropTypes.object,
    route: PropTypes.object,
  };
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, (nextLocation) => {
      let canLeaveRoute = false;
      const isExpandSaved = this.props.forceNetworkStore.isExpandSaved;
      if (!isExpandSaved) {
        if (confirm('是否要保存已拓展的网络图?') === true) {
          this.props.forceNetworkStore.saveNetwork(nextLocation);
        }
      } else {
        canLeaveRoute = true; // 可以离开
      }
      return canLeaveRoute;
    });
  }
  render() {
    const { isLoading, error } = this.props.forceNetworkStore;
    return (
      <div>
        <ForceNetwork {...{ isLoading, error }} />
      </div>
    );
  }
}
