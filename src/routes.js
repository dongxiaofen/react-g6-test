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
    IntroduceV2,
    ApiListDetail,
    ApiTest,
    ConsumptionV2,
    RechargeV2,
    ModifyV2,
    MyapiV2,
    SafeV2,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ IntroduceV2 } />
      <Route path="login" component={ Login } />
      <Route path="v1/introduce" component={ Introduce } />
      <Route path="v1/detail" component={ Detail } />
      <Route path="v1/test" component={ Test } />
      <Route path="v1/consumption" component={ Consumption } />
      <Route path="v1/recharge" component={ Recharge } />
      <Route path="v1/modify" component={ Modify } />
      <Route path="v1/myapi" component={ Myapi } />
      <Route path="v1/safe" component={ Safe } />
      <Route path="v2/introduce" component={ IntroduceV2 } />
      <Route path="v2/detail" component={ ApiListDetail } />
      <Route path="v2/test" component={ ApiTest } />
      <Route path="v2/consumption" component={ ConsumptionV2 } />
      <Route path="v2/recharge" component={ RechargeV2 } />
      <Route path="v2/modify" component={ ModifyV2 } />
      <Route path="v2/myapi" component={ MyapiV2 } />
      <Route path="v2/safe" component={ SafeV2 } />
    </Route>
  );
};
