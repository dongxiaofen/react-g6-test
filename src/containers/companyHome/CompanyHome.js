import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Banner from 'components/companyHome/Banner';
// import Report from 'components/companyHome/Report';
import { Container, Row, Col } from 'components/common/Layout';
import LeftBar from 'components/companyHome/Report/LeftBar';
import styles from './index.less';

@inject('companyHomeStore')
@observer
export default class CompanyHome extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
    companyHomeStore: PropTypes.object,
  };
  render() {
    return (
      <div>
        <Banner location={this.props.location} />
        <div className={styles.contentWrap}>
          <Container id="reportContainer">
            <Row>
              <Col width="2">
                <LeftBar
                  companyHomeStore={this.props.companyHomeStore}
                  {...this.props.location.query} />
              </Col>
              <Col width="10">
                <div id="tabContentWrap" className={styles.tabContentWrap}>
                  {this.props.children}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
