/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import axios from 'axios';
import Uuid from 'node-uuid';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import combineServerData from 'helpers/combineServerData';
import * as allStore from 'stores';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green400 } from 'material-ui/styles/colors';
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
injectTapEventPlugin();
combineServerData(allStore, window.__data);
const history = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
useStrict(true);
axios.interceptors.request.use((axiosConfig) => {
  // Do something before request is sent
  axiosConfig.headers['sc-id'] = `web-${Uuid.v4()}`;
  axiosConfig.headers['scm-source'] = 'SC_WEB';
  return axiosConfig;
}, (error) => {
  console.log('request error', error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  // Do something with request error
  console.log('error', error);
  if (error.response.data.errorCode === 401006 || error.response.data.errorCode === 401007) {
    allStore.modalStore.openTextModal('登录超时', '请重新登录', ()=>{
      allStore.homeStore.postLogin();
    });
    // allStore.modalStore.openAsyncModal((callback) => {
    //   require.ensure([], (require) => {
    //     callback(require('components/test/Test'));
    //   });
    // });
  } else if (error.response.status === 502) {
    allStore.modalStore.openTextModal('后端正在部署', '请稍后');
  }
  return Promise.reject(error);
});
const muiTheme = getMuiTheme({
  userAgent: false,
  raisedButton: {
    secondaryTextColor: green400,
  },
});
ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Provider { ...allStore }>
      <Router routes={getRoutes()} history={history} />
    </Provider>
  </MuiThemeProvider>,
  dest
);
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
// 全局监听action
// spy((event) => {
//   if (event.type === 'action') {
//     console.log(`event.name ${event.name} with args: ${event.arguments}`, event);
//   }
// });
// if (module.hot) {
//   module.hot.accept();
// }
