import Express from 'express';
import cp from 'child_process';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './helpers/Html';
// import HtmlPdf from './helpers/HtmlPdf';
import PrettyError from 'pretty-error';
import http from 'http';
import fs from 'fs';
import axios from 'axios';
import url from 'url';
// import fundebug from 'fundebug-nodejs';
import logger from 'morgan';
import {match, RouterContext} from 'react-router';
import {Provider, useStaticRendering} from 'mobx-react';
import getRoutes from './routes';
import {RouterStore} from 'mobx-react-router';
import * as allStores from 'stores';
import getPermissionMeta from 'helpers/getPermissionMeta';

useStaticRendering(true);
// fundebug.apikey = 'd3c3ad8fd8f470b0bd162e9504c98c1984050474f3f550d47b17c54983633c1e';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['scm-source'] = getPermissionMeta(config.target).scmSource;

// const agent = require('superagent-defaults')();
const BASE_DIRNAME = process.cwd();
// const PDF_DIRNAME = path.join(BASE_DIRNAME, '/static/pdf/');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const getQueryObj = (url) => {
  const theRequest = {};
  if (!url) {
    return theRequest;
  }
  const strs = url.substr(1).split('&');
  for (var i = 0; i < strs.length; i++) {
    theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
  }
  return theRequest;
};

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon1.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(logger('dev'));

app.use((req, res) => {
  axios.defaults.headers.common['scm-token'] = req.cookies['scm-token'] || {};
  console.log('node 被访问');
  // writeDataToFile('cookie', req.cookies);
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  // 检查pdf路径
  const reqPathName = url.parse(req.url).pathname;

  match({routes: getRoutes('server'), location: req.originalUrl}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      // hydrateOnClient();
    } else if (renderProps) {
      // const reqPathName = url.parse(req.url).pathname;
      console.log('路由被match', url.parse(req.url));
      if (reqPathName === '/login') { // 访问首页
        // allStores.clientStore.userInfo = {};
        // allStores.clientStore.envConfig = config.target;
        // allStores.loginStore.isShowLogin = false;
        // allStores.leftBarStore.activeItem = '';
        /*服务端注入RouterStore*/
        const routingStore = new RouterStore();
        allStores.routing = routingStore;
        const component = (
          <Provider { ...allStores }>
            <RouterContext {...renderProps} />
          </Provider>
        );
        res.status(200);
        global.navigator = {userAgent: req.headers['user-agent']};
        res.send('<!doctype html>\n' +
          '<!-- Polyfills -->\n' +
          '<!--[if lt IE 10]>\n' +
          '<script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>\n' +
          '<script src="https://raw.githubusercontent.com/inexorabletash/polyfill/master/typedarray.js"></script>\n' +
          '<![endif]-->\n' +
          '<!--[if lte IE 11]>\n' +
          '<script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>\n' +
          '<![endif]-->\n' +
          ReactDOM.renderToString(<Html reqPathName={reqPathName} isDev={__DEVELOPMENT__}
                                        assets={webpackIsomorphicTools.assets()}
                                        component={component} {...allStores} />));
      } else {
        // writeDataToFile('renderProps', renderProps.components);
        axios.get(config.backendApi + '/api/user/info')
          .then((resp) => {
            /*获取用户信息*/
            // allStores.clientStore.userInfo = resp.data;
            /*服务端注入RouterStore*/
            const routingStore = new RouterStore();
            routingStore.location = {
              pathname: reqPathName,
              query: getQueryObj(url.parse(req.url).query)
            };
            allStores.routing = routingStore;
            const component = (
              <Provider { ...allStores }>
                <RouterContext {...renderProps} />
              </Provider>
            );
            res.status(200);
            global.navigator = {userAgent: req.headers['user-agent']};
            res.send('<!doctype html>\n' +
              '<!-- Polyfills -->\n' +
              '<!--[if lt IE 10]>\n' +
              '<script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>\n' +
              '<script src="https://raw.githubusercontent.com/inexorabletash/polyfill/master/typedarray.js"></script>\n' +
              '<![endif]-->\n' +
              '<!--[if lte IE 11]>\n' +
              '<script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>\n' +
              '<![endif]-->\n' +
              ReactDOM.renderToString(<Html reqPathName={reqPathName} isDev={__DEVELOPMENT__}
                                            assets={webpackIsomorphicTools.assets()}
                                            component={component} {...allStores} />));
          })
          .catch((err) => {
            console.log('userInfo err', err.response.data);
            // const noLoginRoute = ['/', '/about', '/solution'];
            const noLoginRoute = ['/login'];
            if (err.response.data.errorCode === 401007 && noLoginRoute.indexOf(reqPathName) === -1) {
              // allStores.loginStore.isShowLogin = true;
            }
            /*服务端注入RouterStore*/
            const routingStore = new RouterStore();
            routingStore.location = {
              pathname: reqPathName,
              query: getQueryObj(url.parse(req.url).query)
            };
            allStores.routing = routingStore;
            const component = (
              <Provider { ...allStores }>
                <RouterContext {...renderProps} />
              </Provider>
            );
            res.status(200);
            global.navigator = {userAgent: req.headers['user-agent']};
            res.send('<!doctype html>\n' +
              '<!-- Polyfills -->\n' +
              '<!--[if lt IE 10]>\n' +
              '<script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>\n' +
              '<script src="https://raw.githubusercontent.com/inexorabletash/polyfill/master/typedarray.js"></script>\n' +
              '<![endif]-->\n' +
              '<!--[if lte IE 11]>\n' +
              '<script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>\n' +
              '<![endif]-->\n' +
              ReactDOM.renderToString(<Html reqPathName={reqPathName} isDev={__DEVELOPMENT__}
                                            assets={webpackIsomorphicTools.assets()}
                                            component={component} {...allStores} />));
          });
      }
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
