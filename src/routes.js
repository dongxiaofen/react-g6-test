import React from 'react';
// import {Route, IndexRoute, IndexRedirect} from 'react-router';
import {Route, IndexRoute} from 'react-router';
// import axios from 'axios';
import {
    App,
    HomePage,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ HomePage } />
    </Route>
  );
};
