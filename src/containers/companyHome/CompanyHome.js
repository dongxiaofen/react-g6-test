import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction, reaction } from 'mobx';
import Banner from 'components/companyHome/Banner';
import LeftBar from 'components/companyHome/LeftBar';
import { Container, Row, Col } from 'components/common/layout';
import BarLoading from 'components/common/BarLoading';
import NoBalance from 'components/common/NoBalance';
import styles from './index.less';
let getTrademarkDataReaction = null;
let getPatentDataReaction = null;
let alertAnalysisReaction = null;
let monitorAlertReaction = null;
let nowRecordReaction = null;
let judgeDocReaction = null;
let courtAnnouncementReaction = null;
let courtNoticeReaction = null;
let courtExecuted = null;
let courtDishonesty = null;
let courtLitigation = null;
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
  // 'riskPledgeStore',
  'networkStore',
  'blackNetworkStore',
  'reportAxisStore',
  'alertAnalysisStore',
  // 'analysisSrore',
  'taxStore',
  'monitorAxisStore',
  'monitorAlertStore',
  'nowRecordStore',
  'payModalStore',
  'loaningStore',
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
    monitorAlertStore: PropTypes.object,
    nowRecordStore: PropTypes.object,
    loaningStore: PropTypes.object,
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
    this.props.companyHomeStore.getMoudleInfo({ companyName });
    const companyHomeStore = this.props.companyHomeStore;
    const assetsStore = this.props.assetsStore;
    // 在这注入reaction
    getTrademarkDataReaction = reaction(
      () => this.props.uiStore.uiState.trademarkLists.index,
      () => {
        const reportInfo = companyHomeStore.reportInfo;
        assetsStore.getTrademarkData(reportInfo);
      }
    );
    getPatentDataReaction = reaction(
      () => this.props.uiStore.uiState.patentInfo.index,
      () => {
        const reportInfo = companyHomeStore.reportInfo;
        assetsStore.getPatentData(reportInfo);
      }
    );
    alertAnalysisReaction = reaction(
      () => this.props.uiStore.uiState.alertAnalysis.index,
      () => {
        this.props.alertAnalysisStore.getReportModule(companyHomeStore.reportInfo);
      }
    );
    monitorAlertReaction = reaction(
      () => this.props.uiStore.uiState.monitorAlert.index,
      () => {
        this.props.monitorAlertStore.getReportModule(companyHomeStore.reportInfo);
      }
    );
    nowRecordReaction = reaction(
      () => this.props.uiStore.uiState.nowRecordPager.index,
      () => {
        this.props.nowRecordStore.getNowRecordList();
      }
    );
    // 判决文书
    judgeDocReaction = reaction(
      () => this.props.uiStore.uiState.judgeDoc.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: this.props.riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.props.uiStore.uiState.judgeDoc.index,
              size: this.props.uiStore.uiState.judgeDoc.size,
              finance: this.props.riskCourtStore.courtCheckGroup.judgeDoc
            }
          }
        };
        this.props.riskCourtStore.getRiskCourt(params);
      }
    );
    // 法院公告
    courtAnnouncementReaction = reaction(
      () => this.props.uiStore.uiState.courtAnnouncement.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: this.props.riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.props.uiStore.uiState.courtAnnouncement.index,
              size: this.props.uiStore.uiState.courtAnnouncement.size,
              finance: this.props.riskCourtStore.courtCheckGroup.courtAnnouncement
            }
          }
        };
        this.props.riskCourtStore.getRiskCourt(params);
      }
    );
    // 开庭公告
    courtNoticeReaction = reaction(
      () => this.props.uiStore.uiState.courtNotice.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: this.props.riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.props.uiStore.uiState.courtNotice.index,
              size: this.props.uiStore.uiState.courtNotice.size,
              finance: this.props.riskCourtStore.courtCheckGroup.courtNotice
            }
          }
        };
        this.props.riskCourtStore.getRiskCourt(params);
      }
    );
    // 被执行人信息
    courtExecuted = reaction(
      () => this.props.uiStore.uiState.courtExecuted.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: this.props.riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.props.uiStore.uiState.courtExecuted.index,
              size: this.props.uiStore.uiState.courtExecuted.size
            }
          }
        };
        this.props.riskCourtStore.getRiskCourt(params);
      }
    );
    // 失信被执行人信息
    courtDishonesty = reaction(
      () => this.props.uiStore.uiState.courtDishonesty.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: this.props.riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.props.uiStore.uiState.courtDishonesty.index,
              size: this.props.uiStore.uiState.courtDishonesty.size
            }
          }
        };
        this.props.riskCourtStore.getRiskCourt(params);
      }
    );
    // 涉诉资产
    courtLitigation = reaction(
      () => this.props.uiStore.uiState.courtLitigation.index,
      () => {
        const params = {
          basicReportId: companyHomeStore.reportInfo.basicReportId,
          reportId: companyHomeStore.reportInfo.reportId,
          tabAct: this.props.riskCourtStore.courtTabAct,
          config: {
            params: {
              index: this.props.uiStore.uiState.courtLitigation.index,
              size: this.props.uiStore.uiState.courtLitigation.size
            }
          }
        };
        this.props.riskCourtStore.getRiskCourt(params);
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    const leftBarStore = this.props.leftBarStore;
    const module = nextProps.routing.location.pathname.split('/')[2];
    runInAction('初始化报告二级目录', () => {
      leftBarStore.activeItem = module;
    });
  }
  componentWillUnmount() {
    // cancel pending api call
    if (window.reportSourceCancel) {
      window.reportSourceCancel.forEach((cancel) => {
        cancel();
      });
    }
    const reactionArr = [
      getTrademarkDataReaction,
      getPatentDataReaction,
      alertAnalysisReaction,
      monitorAlertReaction,
      nowRecordReaction,
      judgeDocReaction,
      courtAnnouncementReaction,
      courtNoticeReaction,
      courtExecuted,
      courtDishonesty,
      courtLitigation
    ];
    reactionArr.forEach(reactionFunc => {
      if (typeof reactionFunc === 'function') {
        reactionFunc();
      }
    });
    // reset report store data
    [
      'uiStore',
      'leftBarStore',
      'companyHomeStore',
      'bannerStore',
      'loaningStore',
      'corpDetailStore',
      'stockStore',
      'internetStore',
      'assetsStore',
      'teamStore',
      'investmentStore',
      'riskTaxStore',
      'riskCourtStore',
      'riskCheckStore',
      // 'riskPledgeStore',
      'networkStore',
      'blackNetworkStore',
      'reportAxisStore',
      'alertAnalysisStore',
      // 'analysisSrore',
      'taxStore',
      'taxCheckStore',
      'monitorAxisStore',
      'monitorAlertStore',
      'nowRecordStore',
    ].map((key) => {
      if (this.props[key] && this.props[key].resetStore) {
        this.props[key].resetStore();
      }
    });
  }

  render() {
    const errorInfo = this.props.companyHomeStore.createBasicErr;
    const messageMap = {
      '403204': '当前点数不足，请联系管理员充值 400-139-1819',
      '403223': '当前额度不足，请联系管理员充值 400-139-1819',
      '404202': '该企业无工商登记信息',
      '404214': '公司不存在',
      '403226': '套餐已过期',
    };
    if (errorInfo.value) {
      const errorCode = errorInfo.err.response && errorInfo.err.response.data.errorCode;
      return <NoBalance message={messageMap[errorCode] ? messageMap[errorCode] : '创建失败'} />;
    }
    const noReport = ['reportId', 'basicReportId'].every(key => {
      return !this.props.companyHomeStore.reportInfo[key];
    });
    if (noReport) {
      return <div className={styles.loadingBox}><BarLoading /></div>;
    }
    return (
      <Container id="reportContainer">
        <div className={styles.bannerBox}>
          <Banner />
        </div>
        <Row className={styles.contentWrap}>
          <Col width="2" className={styles.leftBar}>
            <LeftBar />
          </Col>
          <Col width="10" className={styles.content}>
            <div id="tabContentWrap" className={styles.tabContentWrap}>
              {this.props.children}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
