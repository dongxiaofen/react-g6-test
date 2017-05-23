import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';

import styles from './index.less';
import SwitchData from './SwitchData';
import Area from './Area';
import Rank from './Rank';
import Assess from './Assess';

@inject('assetTransactionStore')
@observer
export default class Distribution extends Component {
  static propTypes = {
    assetTransactionStore: PropTypes.object
  };
  componentDidMount() {
    const params = toJS(this.props.assetTransactionStore.distributionParams);
    params.startDate = moment().subtract(29, 'days').format('YYYY-MM-DD');
    params.endDate = moment().format('YYYY-MM-DD');
    this.props.assetTransactionStore.setDistributionParams(params);
    this.props.assetTransactionStore.getAreaDistribution(params);
  }

  render() {
    return (
      <div className="clearfix">
        <SwitchData
          params={this.props.assetTransactionStore.distributionParams}
          setParams={this.props.assetTransactionStore.setDistributionParams} />
        <div className={`clearfix ${styles.container}`}>
          <div className={styles.map}>
            <Area />
          </div>
          <div className={styles.barAndDetail}>
            <Rank />
            <Assess />
          </div>
        </div>
      </div>
    );
  }
}
