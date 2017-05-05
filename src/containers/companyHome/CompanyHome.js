import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Banner from 'components/companyHome/Banner';
import LeftBar from 'components/companyHome/LeftBar';
import { Container, Row, Col } from 'components/common/layout';
import styles from './index.less';

@inject(
  'corpDetailStore',
  'riskStore',
  'internetStore',
  'assetsStore',
  'teamStore',
  'networkStore',
  'blackNetworkStore',
  'alertAnalysisStore',
  'relPerCheckStore',
  'stockStore'
)
@observer
export default class CompanyHome extends Component {
  static propTypes = {
    children: PropTypes.object,
    corpDetailStore: PropTypes.object,
    riskStore: PropTypes.object,
    internetStore: PropTypes.object,
    assetsStore: PropTypes.object,
    teamStore: PropTypes.object,
    networkStore: PropTypes.object,
    blackNetworkStore: PropTypes.object,
    alertAnalysisStore: PropTypes.object,
    relPerCheckStore: PropTypes.object,
  };
  componentWillUnmount() {
    console.log('CompanyHome componentWillUnmount', window.reportSourceCancel);
    // cancel pending api call
    window.reportSourceCancel.forEach((cancel) => {
      cancel();
    });
    // reset report store data
    [
      'corpDetailStore',
      'riskStore',
      'internetStore',
      'assetsStore',
      'teamStore',
      'networkStore',
      'blackNetworkStore',
      'alertAnalysisStore',
      'relPerCheckStore',
      'stockStore'
    ].map((key)=>{
      if (this.props[key].resetStore) {
        this.props[key].resetStore();
      }
    });
  }
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
