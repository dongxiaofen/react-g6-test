import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Container, Row, Col } from 'components/common/layout';
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
    window.addEventListener('scroll', this.scrollReport);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollReport);
  }
  scrollReport = () => {
    const bannerContentElement = this.refs.bannerContent;
    if (document.body.scrollTop > 100) {
      // 缩短banner
      bannerContentElement.className = styles.bannerInfoWrap + ' ' + styles.infosmall;

      document.getElementById('bannerLeftContent').className = styles.bannerInfoContent + ' ' + styles.displayNo;
      document.getElementById('bannerLeftContent2').className = styles.bannerInfoContent + ' ' + styles.displayNo;
    } else {
      // 恢复banner
      if (bannerContentElement) {
        bannerContentElement.className = styles.bannerInfoWrap;
      }

      document.getElementById('bannerLeftContent').className = styles.bannerInfoContent;
      document.getElementById('bannerLeftContent2').className = styles.bannerInfoContent;
    }
  }
  render() {
    return (
      <div ref="bannerContent" className={`${styles.bannerInfoWrap} clearfix`}>
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

