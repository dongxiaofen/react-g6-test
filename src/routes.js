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
      <Route path="interface/introduce" component={ Introduce } />
      <Route path="interface/detail" component={ Detail } />
      <Route path="interface/test" component={ Test } />
      <Route path="consume/consumption" component={ Consumption } />
      <Route path="consume/recharge" component={ Recharge } />
      <Route path="account/modify" component={ Modify } />
      <Route path="account/myapi" component={ Myapi } />
      <Route path="account/safe" component={ Safe } />
    </Route>
  );
};
