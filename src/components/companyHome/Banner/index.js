import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
// import { Container, Row, Col } from 'components/common/layout';
import CompanyInfo from './CompanyInfo';
import loadingComp from 'components/hoc/LoadingComp';
// import ReportAction from './ReportAction';
import ReportOper from './ReportOper';
import Footer from './Footer';

@inject('bannerStore', 'routing')
@loadingComp({
  mapDataToProps: props => ({
    loading: props.bannerStore.isLoading,
    error: !props.bannerStore.bannerInfoData.bannerInfo
  })
})
@observer
export default class Banner extends Component {
  static propTypes = {
    routing: PropTypes.object,
    bannerStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.bannerStore.getReportInfo();
  }
  render() {
    return (
      <div className={`clearfix`}>
        <div className={`clearfix ${styles.bannerContent}`}>
          <div className={styles.companyInfo}>
            <CompanyInfo />
          </div>
          <div className={styles.action}>
            <ReportOper />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
