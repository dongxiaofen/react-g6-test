import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {
    App,
    Home,
    Relation,
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
    RuleCompany,
    PersonReport,
    Pdf,
    BlackNetwork,
    Collection,
    BidMarket,
    ForceNetwork,
    NowRecord,
    UserAgreement,
    Disclaimer,
// first append here from plop
  } from 'containers';

// function requireAuth(allStore, nextState, replace) {
function requireAuth() {
  // console.log(allStore, nextState, replace, '------requireAuth');

  // if (allStore !== 'server') {
  //   const { reportId } = allStore.routing.location.query;
  //   if (!reportId) {
  //     replace('/');
  //   }
  // }
}

export default (allStore) => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ HomePage } />
      <Route path="pdfDown" component={ Home } />
      <Route path="relation" component={ Relation } />
      <Route path="searchCompany" component={ SearchCompany } />
      <Route path="myHomePage" component={ MyHomePage } />
      <Route path="riskHeadlines" component={ RiskHeadlines } />
      <Route path="account" component={ Account } />
      <Route path="homePage" component={ HomePage } />
      <Route path="monitorList" component={ MonitorList } />
      <Route path="companyHome" component={ CompanyHome } onEnter={requireAuth.bind(null, allStore)} >
        <IndexRedirect to="corpDetail" />
        <Route path="corpDetail" component={CorpDetail} />
        <Route path="risk" component={Risk} />
        <Route path="internet" component={ Internet } />
        <Route path="team" component={ Team } />
        <Route path="assets" component={ Assets } />
        <Route path="stock" component={ Stock } />
        <Route path="network" component={ Network } />
        <Route path="relPerCheck" component={ RelPerCheck } />
        <Route path="alertAnalysis" component={ AlertAnalysis } />
        <Route path="blackNetwork" component={ BlackNetwork } />
        <Route path="forceNetwork" component={ ForceNetwork } />
        <Route path="nowRecord" component={ NowRecord } />
{/* third append here from plop */}
      </Route>
      <Route path="solution" component={ Solution } />
      <Route path="about" component={ About } />
      {/* 测试modal用 */}
      <Route path="monitorStatistics" component={ MonitorStatistics } />
      <Route path="accountSetting" component={ AccountSetting } />
      <Route path="reportManage" component={ ReportManage } />
      <Route path="personReport" component={ PersonReport } />
      <Route path="ruleList" component={ RuleList } />
      <Route path="ruleAdd" component={ RuleAdd } />
      <Route path="pdf" component={ Pdf } />
      <Route path="collection" component={ Collection } />
      <Route path="ruleCompany" component={ RuleCompany } />
      <Route path="bidMarket" component={ BidMarket } />
      <Route path="userAgreement" component={ UserAgreement } />
      <Route path="disclaimer" component={ Disclaimer } />
{/* second append here from plop */}
    </Route>
  );
};
