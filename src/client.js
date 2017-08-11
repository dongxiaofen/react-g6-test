/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import useScroll from 'scroll-behavior/lib/useStandardScroll';
import {Router, browserHistory} from 'react-router';
import getRoutes from './routes';
// import fundebug from 'fundebug-javascript';
import axios from 'axios';
import Uuid from 'node-uuid';
import {Provider} from 'mobx-react';
import combineServerData from 'helpers/combineServerData';
import * as allStores from 'stores';
import PdfStore from './stores/pdf';
import {useStrict, runInAction} from 'mobx';
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router';
import getPermissionMeta from 'helpers/getPermissionMeta';

const routingStore = new RouterStore();
combineServerData(allStores, window.__data);
// const history = useScroll(() => browserHistory)();
const history = syncHistoryWithStore(browserHistory, routingStore);
const dest = document.getElementById('content');
useStrict(true);
axios.interceptors.request.use((axiosConfig) => {
  // Do something before request is sent
  axiosConfig.headers['sc-id'] = `web-${Uuid.v4()}`;
  axiosConfig.headers['scm-source'] = getPermissionMeta(allStores.clientStore.envConfig).scmSource;
  axiosConfig.headers['Cache-Control'] = 'no-cache';
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
        allStores.loginStore.isShowLogin = true;
      });
    } else {
      location.href = '/';
    }
    // allStores.modalStore.openAsyncModal((callback) => {
    //   require.ensure([], (require) => {`
    //     callback(require('components/test/Test'));
    //   });
    // });
  } else if (error.response.status === 502) {
    allStores.messageStore.openMessage({type: 'warning', content: '后端正在部署', duration: 5000});
  } else if (error.response.data.errorCode === 403232) {
    const callback = () => {
      browserHistory.push('/');
      runInAction('显示登录框', () => {
        allStores.loginStore.isShowLogin = true;
      });
    };
    allStores.modalStore.openCompModal({
      isSingleBtn: true,
      title: '系统提醒',
      closeAction: callback,
      confirmAction: callback,
      contentText: '您的账号在其他设备登录，如果这不是您的操作，请及时修改您的密码',
    });
  }
  return Promise.reject(error);
});
allStores.routing = routingStore;
allStores.pdfStore = new PdfStore();
ReactDOM.render(
  <Provider { ...allStores }>
    <Router routes={getRoutes(allStores)} history={history}/>
  </Provider>,
  dest
);
if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
