import Express from 'express';
import cp from 'child_process';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import fs from 'fs';
import axios from 'axios';
import url from 'url';
import fundebug from 'fundebug-nodejs';
import logger from 'morgan';
import { match, RouterContext } from 'react-router';
import { Provider } from 'mobx-react';
import getRoutes from './routes';
import * as allStores from 'stores';
fundebug.apikey = '45f943a4862476f1895ca38d28def3231ea03ca1e4c94320476f52019f29560f';
const agent = require('superagent-defaults')();
const BASE_DIRNAME = process.cwd();
const PDF_DIRNAME = path.join(BASE_DIRNAME, '/static/pdf/');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const getStringifyData = (data) => {
  let cache = [];
  const output = JSON.stringify(data, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return;
      }
      cache.push(value);
    }
    return value;
  });
  cache = null;
  return output;
}
const writeDataToFile = (id, data) => {
  fs.writeFile(
    path.join(__dirname, id + '.js'),
    getStringifyData(data),
    (err) => {
      if (!err) {
        console.log(" write data to file ok");
      } else {
        console.log("err");
      }
    }
  );
}

const writeStrToHtml = (id, data, callBack) => {
  fs.writeFile(
    PDF_DIRNAME + id,
    data,
    (err) => {
      if (!err) {
        console.log(" write string to html ok");
        callBack();
      } else {
        console.log("write string to html err");
      }
    }
  );
}
const html2Pdf = (htmlName, pdfName, callBack) => {
  const convert = cp.spawn("sh", ['./src/helpers/convert.sh', PDF_DIRNAME + htmlName, PDF_DIRNAME + pdfName]);
  convert.stdout.on('end', function () {
    console.log('stdout: pdf转换成功');
    callBack();
  });
}
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(logger('dev'));

app.use((req, res) => {
  console.log('node 被访问');
  // writeDataToFile('cookie', req.cookies);
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  agent.set('Content-Type', 'application/json')
    .set('scm-source', config.target === 'dianxin_prod' ? 'TEL_WEB' : 'SC_WEB')
    .set('scm-token', req.cookies['scm-token'] || {})
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['scm-source'] = config.target === 'dianxin_prod' ? 'TEL_WEB' : 'SC_WEB';
  axios.defaults.headers.common['scm-token'] = req.cookies['scm-token'] || {};
  match({ routes: getRoutes('server'), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      // hydrateOnClient();
    } else if (renderProps) {
      const reqPathName = url.parse(req.url).pathname;
      console.log('路由被match', reqPathName);
      if (reqPathName === '/pdfDown') {
        allStores.searchStore.searchKey = '誉存科技';// 服务端初始化数据
        const params = {
          keyWord: '誉存科技',
          type: 'COMPANY_NAME'
        };
        agent.get(config.backendApi + '/api/company/search')
          .query(params)
          .end(function (err, resp) {
            // writeDataToFile('resp', resp.body);
            allStores.searchStore.searchRes = resp.body.data;
            const component = (
              <Provider { ...allStores }>
                <RouterContext {...renderProps} />
              </Provider>
            );
            const reportHtml = ReactDOM.renderToString(<Html pdfDown="1" assets={webpackIsomorphicTools.assets()} component={component} {...allStores} />);
            const companyName = '吴亚东';
            const htmlName = 'wyd.html';
            const pdfName = 'wyd.pdf';
            writeStrToHtml(htmlName, reportHtml, () => {
              html2Pdf(htmlName, pdfName, () => {
                res.download(PDF_DIRNAME + pdfName, companyName + '.pdf', (err) => {
                  // 删除pdf
                  const del = cp.spawn("sh", ['./src/helpers/delPdf.sh', PDF_DIRNAME + htmlName, PDF_DIRNAME + pdfName]);
                  del.stdout.on('end', function () {
                    console.log('stdout: pdf删除成功');
                  });
                });
              });
            });
          })
      } else {
        // writeDataToFile('renderProps', renderProps.components);
        // allStores.homeStore.isLogin = true;// 服务端初始化数据
        // axios.get(config.backendApi + '/api/user/info')
        //   .then((resp) => {
        //     console.log(resp);
        //   })
        //   .catch((err) => {
        //     console.log('err', err);
        //   });
        // agent.get(config.backendApi + '/api/user/info')
        //     .set('Content-Type', 'application/json')
        //     .set('scm-source', config.target === 'dianxin_prod' ? 'TEL_WEB' : 'SC_WEB')
        //     .set('scm-token', req.cookies['scm-token'] || {})
        //     .end(function (err, resp) {
        //       console.log(resp.body);
        //     })
        allStores.searchStore.searchKey = '誉存科技';
        // console.log('homeStore', homeStore);
        const component = (
          <Provider { ...allStores }>
            <RouterContext {...renderProps} />
          </Provider>
        );
        res.status(200);
        global.navigator = { userAgent: req.headers['user-agent'] };
        res.send('<!doctype html>\n' +
          '<!-- Polyfills -->\n' +
          '<!--[if lt IE 10]>\n' +
          '<script src="https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js"></script>\n' +
          '<script src="https://raw.githubusercontent.com/inexorabletash/polyfill/master/typedarray.js"></script>\n' +
          '<![endif]-->\n' +
          '<!--[if lte IE 11]>\n' +
          '<script src="https://as.alipayobjects.com/g/component/??es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js"></script>\n' +
          '<![endif]-->\n' +
          ReactDOM.renderToString(<Html reqPathName={reqPathName} isDev={__DEVELOPMENT__} assets={webpackIsomorphicTools.assets()} component={component} {...allStores} />));
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
