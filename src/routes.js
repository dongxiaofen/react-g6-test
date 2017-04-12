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
// first append here from plop
  } from 'containers';

export default () => {
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
      <Route path="companyHome" component={ CompanyHome }>
        <IndexRedirect to="corpDetail" />
        <Route path="corpDetail" component={CorpDetail} />
        <Route path="risk" component={Risk} />
      </Route>
      <Route path="solution" component={ Solution } />
      <Route path="about" component={ About } />
      <Route path="home" component={ Home } />
{/* second append here from plop */}
    </Route>
  );
};
