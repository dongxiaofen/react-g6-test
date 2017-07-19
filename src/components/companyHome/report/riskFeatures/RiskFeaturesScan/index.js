import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import RiskFeaturesStart from './RiskFeaturesStart';
import RiskFeaturesResult from './RiskFeaturesResult';
import styles from './index.less';

@inject('companyHomeStore', 'riskFeaturesStore')
@observer
export default class RiskFeaturesScan extends Component {
  static propTypes = {
    companyHomeStore: PropTypes.object,
    riskFeaturesStore: PropTypes.object,
  }
  componentDidMount() {
    const reportId = this.props.companyHomeStore.reportInfo.reportId;
    this.props.riskFeaturesStore.getScanStatus(reportId);
  }
  render() {
    return (
      <div className={styles.box}>
        {this.props.riskFeaturesStore.status === 'FIRST_TIME' ? <RiskFeaturesStart {...this.props} /> : <RiskFeaturesResult {...this.props} />}
      </div>
    );
  }
}
