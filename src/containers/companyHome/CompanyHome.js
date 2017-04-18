import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Banner from 'components/companyHome/Banner';
import LeftBar from 'components/companyHome/LeftBar';
import { Container, Row, Col } from 'components/common/layout';
import styles from './index.less';

@observer
export default class CompanyHome extends Component {
  static propTypes = {
    children: PropTypes.object,
  };
  render() {
    return (
      <div>
        <Banner />
        <div className={styles.contentWrap}>
          <Container id="reportContainer">
            <Row>
              <Col width="2">
                <LeftBar />
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
