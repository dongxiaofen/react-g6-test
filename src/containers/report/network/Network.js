import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import CurrentNetwork from 'components/companyHome/report/network/CurrentNetwork';

@inject('routing', 'networkStore')
@batchReport('networkStore')
@observer
export default class Network extends Component {
  static propTypes = {
    networkStore: PropTypes.object
  };
  componentWillUnmount() {
    this.props.networkStore.resetSvg();
  }
  render() {
    const {isLoading, error} = this.props.networkStore;
    return (
      <CurrentNetwork {...{isLoading, error}} />
    );
  }
}
