import React from 'react';
// import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {Route, IndexRoute} from 'react-router';
// import axios from 'axios';
import {
    App,
    Login,
    // Interface,
    Detail,
    Introduce,
    Test,
    // Consume,
    Consumption,
    Recharge,
    // Account,
    Modify,
    Myapi,
    Safe,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Introduce } />
      <Route path="login" component={ Login } />
      {/* <Route path="v1">
        <Route path="interface/introduce" component={ Introduce } />
      </Route> */}
      <Route path="v1/introduce" component={ Introduce } />
      <Route path="v1/detail" component={ Detail } />
      <Route path="v1/test" component={ Test } />
      <Route path="v1/consumption" component={ Consumption } />
      <Route path="v1/recharge" component={ Recharge } />
      <Route path="v1/modify" component={ Modify } />
      <Route path="v1/myapi" component={ Myapi } />
      <Route path="v1/safe" component={ Safe } />
      <Route path="v2/introduce" component={ Introduce } />
    </Route>
  );
};
