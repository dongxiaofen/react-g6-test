import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {
    App,
    Home,
    Relation,
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
    TestModal,
    Internet,
    MonitorStatistics,
    ReportManage,
// first append here from plop
  } from 'containers';

function requireAuth(allStore, nextState, replace) {
  console.log(allStore, nextState, replace, '------requireAuth');
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
      {/* third append here from plop */}
      </Route>
      <Route path="solution" component={ Solution } />
      <Route path="about" component={ About } />
      {/* 测试modal用 */}
      <Route path="testModal" component={TestModal } />
      <Route path="monitorStatistics" component={ MonitorStatistics } />
      <Route path="reportManage" component={ ReportManage } />
{/* second append here from plop */}
    </Route>
  );
};
