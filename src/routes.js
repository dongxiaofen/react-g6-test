import React from 'react';
import {Route, IndexRoute} from 'react-router';
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
    Solution,
    About,
// first append here from plop
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ HomePage } />
      <Route path="/pdfDown" component={ Home } />
      <Route path="/relation" component={ Relation } />
      <Route path="/searchCompany" component={ SearchCompany } />
      <Route path="/searchCompany" component={ SearchCompany } />
      <Route path="/myHomePage" component={ MyHomePage } />
      <Route path="/riskHeadlines" component={ RiskHeadlines } />
      <Route path="/account" component={ Account } />
      <Route path="/homePage" component={ HomePage } />
      <Route path="/monitorList" component={ MonitorList } />
      <Route path="/solution" component={ Solution } />
      <Route path="/about" component={ About } />
{/* second append here from plop */}
    </Route>
  );
};
