import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchReport } from 'components/hoc';
import BlackNetwork from 'components/companyHome/report/blackNetwork/BlackNetwork';

@inject('routing', 'blackNetworkStore')
@batchReport('blackNetwork')
@observer
export default class BlackNetworkContainer extends Component {
  static propTypes = {
    blackNetworkStore: PropTypes.object
  };
  render() {
    const {isLoading, error} = this.props.blackNetworkStore;
    return (
      <div>
        <BlackNetwork {...{isLoading, error}} />
      </div>
    );
  }
}
