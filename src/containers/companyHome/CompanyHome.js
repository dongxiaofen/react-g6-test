import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import Banner from 'components/companyHome/Banner';
import LeftBar from 'components/companyHome/LeftBar';
import { Container, Row, Col } from 'components/common/layout';
import CirclesLoading from 'components/common/CirclesLoading';
import styles from './index.less';

@inject(
  'routing',
  'leftBarStore',
  'uiStore',
  'companyHomeStore',
  'bannerStore',
  'corpDetailStore',
  'stockStore',
  'internetStore',
  'assetsStore',
  'teamStore',
  'investmentStore',
  'riskTaxStore',
  'riskCourtStore',
  'riskCheckStore',
  'riskPledgeStore',
  'networkStore',
  'blackNetworkStore',
  'reportAxisStore',
  'alertAnalysisStore',
  'analysisSrore',
  'taxStore',
  'monitorAxisStore',
  'monitorAlertStore',
  'nowRecordStore',
  'payModalStore',
)
@observer
export default class CompanyHome extends Component {
  static propTypes = {
    children: PropTypes.object,
    routing: PropTypes.object,
    leftBarStore: PropTypes.object,
    uiStore: PropTypes.object,
    companyHomeStore: PropTypes.object,
    bannerStore: PropTypes.object,
    corpDetailStore: PropTypes.object,
    stockStore: PropTypes.object,
    internetStore: PropTypes.object,
    assetsStore: PropTypes.object,
    teamStore: PropTypes.object,
    investmentStore: PropTypes.object,
    riskTaxStore: PropTypes.object,
    riskCourtStore: PropTypes.object,
    riskCheckStore: PropTypes.object,
    riskPledgeStore: PropTypes.object,
    networkStore: PropTypes.object,
    blackNetworkStore: PropTypes.object,
    reportAxisStore: PropTypes.object,
    alertAnalysisStore: PropTypes.object,
    analysisSrore: PropTypes.object,
    taxStore: PropTypes.object,
    monitorAxisStore: PropTypes.object,
    nowRecordStore: PropTypes.object,
  };
  componentWillMount() {
    const leftBarStore = this.props.leftBarStore;
    const module = this.props.routing.location.pathname.split('/')[2];
    runInAction('初始化报告二级目录', () => {
      leftBarStore.activeItem = module;
    });
  }
  componentDidMount() {
    const companyName = this.props.routing.location.query.companyName;
    this.props.companyHomeStore.getReportStatus({companyName});
  }
  componentWillUnmount() {
    // cancel pending api call
    if (window.reportSourceCancel) {
      window.reportSourceCancel.forEach((cancel) => {
        cancel();
      });
    }
    // reset report store data
    [
      'uiStore',
      'companyHomeStore',
      'bannerStore',
      'corpDetailStore',
      'stockStore',
      'internetStore',
      'assetsStore',
      'teamStore',
      'investmentStore',
      'riskTaxStore',
      'riskCourtStore',
      'riskCheckStore',
      'riskPledgeStore',
      'networkStore',
      'blackNetworkStore',
      'reportAxisStore',
      'alertAnalysisStore',
      'analysisSrore',
      'taxStore',
      'taxCheckStore',
      'companyHomeStore',
      'monitorAxisStore',
      'monitorAlert',
      'nowRecordStore'
    ].map((key)=>{
      if (this.props[key].resetStore) {
        this.props[key].resetStore();
      }
    });
  }
  render() {
    const noReport = ['reportId', 'basicReportId'].every(key => {
      return !this.props.companyHomeStore.reportInfo[key];
    });
    if (noReport) {
      return <CirclesLoading />;
    }
    return (
      <Container id="reportContainer">
        <div className={styles.bannerBox}>
          <Banner />
        </div>
        <Row className={styles.contentWrap}>
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
    );
  }
}
