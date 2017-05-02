import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Container } from 'components/common/layout';
import CompanyInfo from './CompanyInfo';

@inject('bannerStore', 'routing')
@observer
export default class Banner extends Component {
  static propTypes = {
    routing: PropTypes.object,
    bannerStore: PropTypes.object,
  };
  componentDidMount() {
    const { monitorId, reportId, companyName, companyType } = this.props.routing.location.query;
    this.props.bannerStore.getBannerInfo(monitorId, reportId, companyName, companyType);
    this.props.bannerStore.getStockCode({ monitorId, reportId, companyName, companyType });
  }
  render() {
    return (
      <div className={`clearfix ${styles.bannerInfoWrap}`}>
        <Container>
          <div className={styles.companyInfo}>
            <CompanyInfo />
          </div>
        </Container>
      </div>
    );
  }
}

