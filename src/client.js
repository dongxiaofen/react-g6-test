/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import fundebug from 'fundebug-javascript';
import axios from 'axios';
import Uuid from 'node-uuid';
import { Provider } from 'mobx-react';
import combineServerData from 'helpers/combineServerData';
import * as allStore from 'stores';
import { useStrict, runInAction } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
// import { useStrict, spy } from 'mobx';
// // 全局监听action
// spy((event) => {
//   if (event.type === 'action') {
//     console.log(`event.name ${event.name} with args: ${event.arguments}`, event);
//   }
// });
// if (module.hot) {
//   module.hot.accept();
// }

// import ReactUpdates from 'react-dom/lib/ReactUpdates';
// import ReactDefaultBatchingStrategy from 'react-dom/lib/ReactDefaultBatchingStrategy';
// let isHandlingError = false;
// if (process.env.NODE_ENV !== 'production') {
//   isHandlingError = true;
// }
// const ReactTryCatchBatchingStrategy = {
//   // this is part of the BatchingStrategy API. simply pass along
//   // what the default batching strategy would do.
//   get isBatchingUpdates() { return ReactDefaultBatchingStrategy.isBatchingUpdates; },

//   batchedUpdates(...args) {
//     try {
//       ReactDefaultBatchingStrategy.batchedUpdates(...args);
//     } catch (err) {
//       if (isHandlingError) {
//         // our error handling code threw an error. just throw now
//         throw err;
//       }
//       isHandlingError = true;
//       try {
//         console.warn('js运行时错误!', err.name, err.message);
//       } finally {
//         isHandlingError = false;
//       }
//     }
//   },
// };
// ReactUpdates.injection.injectBatchingStrategy(ReactTryCatchBatchingStrategy);
// Needed for onTouchTap
fundebug.apikey = 'd3c3ad8fd8f470b0bd162e9504c98c1984050474f3f550d47b17c54983633c1e';
// fundebug.notify('Test', 'Hello xx Fundebug!');
const routingStore = new RouterStore();
combineServerData(allStore, window.__data);
// const history = useScroll(() => browserHistory)();
const history = syncHistoryWithStore(browserHistory, routingStore);
const dest = document.getElementById('content');
useStrict(true);
axios.interceptors.request.use((axiosConfig) => {
  // Do something before request is sent
  axiosConfig.headers['sc-id'] = `web-${Uuid.v4()}`;
  axiosConfig.headers['scm-source'] = 'SC_WEB';
  axiosConfig.headers['Cache-Control'] = 'no-cache';
  if (!axiosConfig.params) {
    axiosConfig.params = {
      timestamp: new Date().getTime()
    };
  } else {
    axiosConfig.params.timestamp = new Date().getTime();
  }
  return axiosConfig;
}, (error) => {
  console.log('request error', error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Do something with request error
  console.log('error', error);
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  if (error.response.data.errorCode === 401006 || error.response.data.errorCode === 401007) {
    if (error.config.url !== '/api/user/logout') {
      runInAction('显示登录框', () => {
        allStore.loginStore.isShowLogin = true;
      });
    } else {
      location.href = '/';
    }
    // allStore.modalStore.openAsyncModal((callback) => {
    //   require.ensure([], (require) => {
    //     callback(require('components/test/Test'));
    //   });
    // });
  } else if (allStore.clientStore.envConfig === 'local' && error.response.status === 502) {
    allStore.messageStore.openMessage({ type: 'warning', content: '后台正在部署， 请稍后使用', duration: 7000 });
  }
  return Promise.reject(error);
});
allStore.routing = routingStore;
ReactDOM.render(
  <Provider { ...allStore }>
    <Router routes={getRoutes(allStore)} history={history} />
  </Provider>,
  dest
);
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
