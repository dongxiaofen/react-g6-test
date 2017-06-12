import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import CompanyInfo from './CompanyInfo';
import loadingComp from 'components/hoc/LoadingComp';
// import ReportAction from './ReportAction';

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
  // componentDidMount() {
  //   const {companyName} = this.props.routing.location.query;
  //   this.props.bannerStore.getReportStatus({companyName});
  //   // this.props.bannerStore.getStockCode({ monitorId, reportId });
  // }
  bannerCountAndDate() {
    const bannerInfoData = this.props.bannerStore.bannerInfoData;
    return (
      <div className={`clearfix ${styles.countAndDate}`}>
        <div className={styles.date}>
          更新日期：{bannerInfoData.lastModifiedTs}
        </div>
        <div className={styles.count}>
          被查询次数：{bannerInfoData.searchedCount}
        </div>
      </div>
    );
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className={`clearfix`}>
              <div className={`clearfix ${styles.bannerContent}`}>
                <div className={styles.companyInfo}>
                  <CompanyInfo />
                </div>
                <div className={styles.action}>
                  {/* <ReportAction bannerStore={this.props.bannerStore} />*/}
                </div>
                {/* {this.bannerCountAndDate()}*/}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
