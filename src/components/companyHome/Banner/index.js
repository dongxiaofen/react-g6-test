import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
import CompanyInfo from './CompanyInfo';
import ReportAction from './ReportAction';

@inject('bannerStore', 'routing')
@observer
export default class Banner extends Component {
  static propTypes = {
    routing: PropTypes.object,
    bannerStore: PropTypes.object,
  };
  componentDidMount() {
    const { monitorId, reportId } = this.props.routing.location.query;
    this.props.bannerStore.getBannerInfo({ monitorId, reportId });
    this.props.bannerStore.getStockCode({ monitorId, reportId });
  }
  bannerCountAndDate() {
    const bannerStore = this.props.bannerStore;
    return (
      <div className={`clearfix ${styles.countAndDate}`}>
        <div className={styles.date}>
          更新日期：{bannerStore.lastModifiedTs}
        </div>
        <div className={styles.count}>
          被查询次数：{bannerStore.searchedCount}
        </div>
      </div>
    );
  }
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className={`clearfix ${styles.bannerInfoWrap}`}>
              <div className={`clearfix ${styles.bannerContent}`}>
                <div className={styles.companyInfo}>
                  <CompanyInfo />
                </div>
                <div className={styles.action}>
                  <ReportAction bannerStore={this.props.bannerStore} />
                </div>
                {this.bannerCountAndDate()}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

