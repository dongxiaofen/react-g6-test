import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
    App,
    Home,
    Relation,
    RiskHeadlines,
// first append here from plop
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Home } />
      <Route path="/pdfDown" component={ Home } />
      <Route path="/relation" component={ Relation } />
      <Route path="/riskHeadlines" component={ RiskHeadlines } />
{/* second append here from plop */}
    </Route>
  );
};
