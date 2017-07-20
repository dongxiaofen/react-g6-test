import React, {Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import RiskFeaturesStart from './RiskFeaturesStart';
import RiskFeaturesResult from './RiskFeaturesResult';
import styles from './index.less';

@inject('reportAxisStore', 'companyHomeStore')
@observer
export default class RiskFeaturesScan extends Component {
  static propTypes = {
    companyHomeStore: PropTypes.object,
    reportAxisStore: PropTypes.object,
  }
  componentDidMount() {
    const reportId = this.props.companyHomeStore.reportInfo.reportId;
    this.props.reportAxisStore.getScanStatus(reportId);
  }
  // componentWillUnmount() {
  //   this.props.reportAxisStore.resetStoreRisk();
  // }
  render() {
    return (
      <div className={styles.box}>
        {this.props.reportAxisStore.status === 'FIRST_TIME' ? <RiskFeaturesStart {...this.props} /> : <RiskFeaturesResult {...this.props} />}
      </div>
    );
  }
}
