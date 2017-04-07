import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Container, Row, Col } from 'components/common/Layout';
import CompanyInfo from './CompanyInfo';
@inject('companyHomeStore')
@observer
export default class Banner extends Component {
  static propTypes = {
    location: PropTypes.object,
    companyHomeStore: PropTypes.object,
  };
  componentDidMount() {
    const {monitorId, reportId, companyName, companyType} = this.props.location.query;
    this.props.companyHomeStore.getBannerInfo(monitorId, reportId, companyName, companyType);
  }
  render() {
    return (
      <div id="bannerWrap" className={`${styles.bannerInfoWrap} clearfix`}>
        <Container>
          <Row>
            <Col width="8">
              <CompanyInfo />
            </Col>
            <Col width="4">
              actions
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

