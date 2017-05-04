import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import CurrentNetwork from 'components/companyHome/report/network/CurrentNetwork';

@inject('routing', 'networkStore')
@batchReport('network')
@observer
export default class Network extends Component {
  static propTypes = {
    networkStore: PropTypes.object
  };
  render() {
    return (
      <div>
        <CurrentNetwork isLoading={this.props.networkStore.isLoading} error={this.props.networkStore.error} layout={this.props.networkStore.layout} switchLayout={this.props.networkStore.switchLayout} />
      </div>
    );
  }
}
