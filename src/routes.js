import React from 'react';
// import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {Route, IndexRoute} from 'react-router';
// import axios from 'axios';
import {
    App,
    Login,
    Api,
    Introduce,
    Test,
    Consume,
    Account,
    Modify,
    Myapi,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Api } />
      <Route path="login" component={ Login } />
      <Route path="api" component={ Api } >
        <IndexRoute component={ Introduce } />
        <Route path="introduce" component={ Introduce } />
        <Route path="test" component={ Test } />
      </Route>
      <Route path="consume" component={ Consume } >
        {/* <IndexRoute component={ Introduce } />
        <Route path="introduce" component={ Introduce } />
        <Route path="test" component={ Test } /> */}
      </Route>
      <Route path="account" component={ Account } >
         <IndexRoute component={ Modify } />
        <Route path="modify" component={ Modify } />
        <Route path="myapi" component={ Myapi } />
      </Route>
    </Route>
  );
};
