import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import axios from 'axios';
import {
    App,
    SearchCompany,
    MyHomePage,
    RiskHeadlines,
    Account,
    HomePage,
    MonitorList,
    CompanyHome,
    Solution,
    About,
    CorpDetail,
    Risk,
    Internet,
    MonitorStatistics,
    AccountSetting,
    ReportManage,
    Team,
    Assets,
    RuleList,
    RuleAdd,
    Stock,
    Network,
    RelPerCheck,
    AlertAnalysis,
    TimeAxis,
    RuleCompany,
    PersonReport,
    Pdf,
    BlackNetwork,
    Collection,
    BidMarket,
    HighRiskCorp,
    AccountProfile,
    ForceNetwork,
    NowRecord,
    UserAgreement,
    Disclaimer,
    Tax,
    TaxCheck,
    AssetTransaction,
    InLoanAnalysis,

    InvestAndOffice,
    ComprehenEval,
    ProfitEval,
    OperationEval,
    GrowthAbilityEval,
// first append here from plop
  } from 'containers';

function requireAuth(nextState) {
  // console.log(allStore, nextState, replace, '------requireAuth');
  const params = {
    pageViewEntryList: [
      {
        accessTime: Date.now(),
        uri: nextState.location.pathname,
        queryString: nextState.location.search.slice(1),
      }
    ]
  };
  axios.post('/api/sc/collect/page', params);
  // if (allStore !== 'server') {
  //   const { reportId } = allStore.routing.location.query;
  //   if (!reportId) {
  //     replace('/');
  //   }
  // }
}

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ HomePage } />
      <Route path="pdfDown" component={ Pdf } />
      <Route path="searchCompany" component={ SearchCompany } onEnter={requireAuth} />
      <Route path="myHomePage" component={ MyHomePage } onEnter={requireAuth} />
      <Route path="riskHeadlines" component={ RiskHeadlines } onEnter={requireAuth} />
      <Route path="account" component={ Account } onEnter={requireAuth} />
      <Route path="homePage" component={ HomePage } onEnter={requireAuth} />
      <Route path="monitorList" component={ MonitorList } onEnter={requireAuth} />
      <Route path="inLoanAnalysis" component= { InLoanAnalysis } onEnter={ requireAuth } />
      <Route path="companyHome" component={ CompanyHome } >
        <IndexRedirect to="corpDetail" />
        <Route path="corpDetail" component={CorpDetail} onEnter={requireAuth} />
        <Route path="risk" component={Risk} onEnter={requireAuth} />
        <Route path="internet" component={ Internet } onEnter={requireAuth} />
        <Route path="team" component={ Team } onEnter={requireAuth} />
        <Route path="assets" component={ Assets } onEnter={requireAuth} />
        <Route path="stock" component={ Stock } onEnter={requireAuth} />
        <Route path="network" component={ Network } onEnter={requireAuth} />
        <Route path="alertAnalysis" component={ AlertAnalysis } onEnter={requireAuth} />
        <Route path="timeAxis" component={ TimeAxis } onEnter={requireAuth} />
        <Route path="blackNetwork" component={ BlackNetwork } onEnter={requireAuth} />
        <Route path="forceNetwork" component={ ForceNetwork } onEnter={requireAuth} />
        <Route path="nowRecord" component={ NowRecord } onEnter={requireAuth} />
        <Route path="tax" component={ Tax } onEnter={requireAuth} />
        <Route path="investAndOffice" component={ InvestAndOffice } />
        {/* 贷中*/}
        <Route path="comprehenEval" component={ ComprehenEval } />
        <Route path="profitEval" component={ ProfitEval } />
        <Route path="operationEval" component={ OperationEval } />
        <Route path="growthAbilityEval" component={ GrowthAbilityEval } />
        {/* 贷后*/}
{/* third append here from plop */}
      </Route>
      <Route path="relPerCheck" component={ RelPerCheck } onEnter={requireAuth} />
      <Route path="taxCheck" component={ TaxCheck } onEnter={requireAuth} />
      <Route path="solution" component={ Solution } />
      <Route path="about" component={ About } />
      {/* 测试modal用 */}
      <Route path="monitorStatistics" component={ MonitorStatistics } onEnter={requireAuth} />
      <Route path="accountSetting" component={ AccountSetting } onEnter={requireAuth} />
      <Route path="reportManage" component={ ReportManage } onEnter={requireAuth} />
      <Route path="personReport" component={ PersonReport } onEnter={requireAuth} />
      <Route path="ruleList" component={ RuleList } onEnter={requireAuth} />
      <Route path="ruleAdd" component={ RuleAdd } onEnter={requireAuth} />
      <Route path="pdf" component={ Pdf } />
      <Route path="collection" component={ Collection } onEnter={requireAuth} />
      <Route path="ruleCompany" component={ RuleCompany } onEnter={requireAuth} />
      <Route path="bidMarket" component={ BidMarket } onEnter={requireAuth} />
      <Route path="highRiskCorp" component={ HighRiskCorp } onEnter={requireAuth} />
      <Route path="userAgreement" component={ UserAgreement } onEnter={requireAuth} />
      <Route path="disclaimer" component={ Disclaimer } onEnter={requireAuth} />
      <Route path="accountProfile" component={ AccountProfile } onEnter={requireAuth} />
      <Route path="assetTransaction" component={ AssetTransaction } onEnter={requireAuth} />
{/* second append here from plop */}
    </Route>
  );
};
