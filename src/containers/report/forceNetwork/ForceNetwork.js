import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import ForceNetwork from 'components/companyHome/report/forceNetwork/ForceNetwork';

@inject('routing', 'forceNetworkStore')
@batchReport('forceNetwork')
@observer
export default class ForceNetworkContainer extends Component {
  static propTypes = {
    forceNetworkStore: PropTypes.object
  };
  render() {
    const {isLoading, error} = this.props.forceNetworkStore;
    return (
      <div>
        <ForceNetwork {...{isLoading, error}} />
      </div>
    );
  }
}
