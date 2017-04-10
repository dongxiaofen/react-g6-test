import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
    App,
    Home,
    Relation,
    MyHomePage,
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
      <Route path="/myHomePage" component={ MyHomePage } />
      <Route path="/account" component={ Account } />
      <Route path="/homePage" component={ HomePage } />
      <Route path="/monitorList" component={ MonitorList } />
      <Route path="/solution" component={ Solution } />
      <Route path="/about" component={ About } />
{/* second append here from plop */}
    </Route>
  );
};
