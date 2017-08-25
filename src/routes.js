import React from 'react';
// import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {Route, IndexRoute} from 'react-router';
// import axios from 'axios';
import {
    App,
    Login,
    Interface,
    Detail,
    Introduce,
    Test,
    Consume,
    Consumption,
    Recharge,
    Account,
    Modify,
    Myapi,
    Safe,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Introduce } />
      <Route path="login" component={ Login } />
      <Route path="interface" component={ Interface } >
        <IndexRoute component={ Introduce } />
        <Route path="introduce" component={ Introduce } />
        <Route path="detail" component={ Detail } />
        <Route path="test" component={ Test } />
      </Route>
      <Route path="consume" component={ Consume } >
        <IndexRoute component={ Consumption } />
        <Route path="consumption" component={ Consumption } />
        <Route path="recharge" component={ Recharge } />
      </Route>
      <Route path="account" component={ Account } >
        <IndexRoute component={ Modify } />
        <Route path="modify" component={ Modify } />
        <Route path="myapi" component={ Myapi } />
        <Route path="safe" component={ Safe } />
      </Route>
    </Route>
  );
};
