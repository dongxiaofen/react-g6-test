import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import Banner from 'components/companyHome/Banner';
import LeftBar from 'components/companyHome/LeftBar';
import { Container, Row, Col } from 'components/common/layout';
import styles from './index.less';

@inject(
  'routing',
  'uiStore',
  'bannerStore',
  'leftBarStore',
  'corpDetailStore',
  'riskStore',
  'internetStore',
  'assetsStore',
  'teamStore',
  'networkStore',
  'blackNetworkStore',
  'alertAnalysisStore',
  'timeAxisStore',
  'relPerCheckStore',
  'nowRecordStore',
  'stockStore',
  'taxStore',
  'taxCheckStore',
  'payModalStore'
)
@observer
export default class CompanyHome extends Component {
  static propTypes = {
    children: PropTypes.object,
    routing: PropTypes.object,
    leftBarStore: PropTypes.object,
    uiStore: PropTypes.object,
    corpDetailStore: PropTypes.object,
    riskStore: PropTypes.object,
    internetStore: PropTypes.object,
    assetsStore: PropTypes.object,
    teamStore: PropTypes.object,
    networkStore: PropTypes.object,
    blackNetworkStore: PropTypes.object,
    alertAnalysisStore: PropTypes.object,
    timeAxisStore: PropTypes.object,
    relPerCheckStore: PropTypes.object,
    nowRecordStore: PropTypes.object,
    taxStore: PropTypes.object,
    taxCheckStore: PropTypes.object,
    bannerStore: PropTypes.object,
  };
  componentWillMount() {
    const leftBarStore = this.props.leftBarStore;
    const module = this.props.routing.location.pathname.split('/')[2];
    runInAction('初始化报告二级目录', () => {
      leftBarStore.activeItem = module;
    });
  }
  componentDidMount() {
    const {companyName} = this.props.routing.location.query;
    this.props.bannerStore.getReportStatus({companyName});
    // this.props.bannerStore.getStockCode({ monitorId, reportId });
  }
  componentWillUnmount() {
    console.log('CompanyHome componentWillUnmount', window.reportSourceCancel);
    // cancel pending api call
    window.reportSourceCancel.forEach((cancel) => {
      cancel();
    });
    // reset report store data
    [
      'uiStore',
      'bannerStore',
      'leftBarStore',
      'corpDetailStore',
      'riskStore',
      'internetStore',
      'assetsStore',
      'teamStore',
      'networkStore',
      'blackNetworkStore',
      'alertAnalysisStore',
      'timeAxisStore',
      'relPerCheckStore',
      'stockStore',
      'nowRecordStore',
      'taxStore',
      'taxCheckStore'
    ].map((key)=>{
      if (this.props[key].resetStore) {
        this.props[key].resetStore();
      }
    });
  }
  render() {
    return (
      <div>
        <Container>
          <div className={styles.bannerBox}>
            <Banner />
          </div>
        </Container>
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
