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
import {match, RouterContext} from 'react-router';
import {Provider, useStaticRendering} from 'mobx-react';
import getRoutes from './routes';
import {RouterStore} from 'mobx-react-router';
import * as allStores from 'stores';
import getPermissionMeta from 'helpers/getPermissionMeta';
import {pdfDownload} from './api/pdf';
import {
  upFileToQiniu,
  checkPDF,
  deletePdfsOnQiniu
} from './helpers/pdfHelper';
import schedule from 'node-schedule';
import PdfBody from 'components/pdf/PdfReport';

useStaticRendering(true);
fundebug.apikey = 'd3c3ad8fd8f470b0bd162e9504c98c1984050474f3f550d47b17c54983633c1e';

// 设置定时删除七牛文件
schedule.scheduleJob('0 0 0 * * *', () => {
  console.log('启动删除文件---');
  deletePdfsOnQiniu();
});

const agent = require('superagent-defaults')();
const BASE_DIRNAME = process.cwd();
const PDF_DIRNAME = path.join(BASE_DIRNAME, '/static/pdf/');
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
};
const writeDataToFile = (id, data) => {
  fs.writeFile(
    path.join(__dirname, id + '.json'),
    getStringifyData(data),
    (err) => {
      if (!err) {
        console.log(' write data to file ok');
      } else {
        console.log('err');
      }
    }
  );
};

const writeStrToHtml = (id, data, callBack, errorCallBack) => {
  fs.writeFile(
    PDF_DIRNAME + id,
    data,
    (err) => {
      if (!err) {
        console.log(' write string to html ok');
        if (callBack) {
          callBack();
        }
      } else {
        console.log('write string to html err');
        if (errorCallBack) {
          errorCallBack();
        }
      }
    }
  );
};
const html2Pdf = (htmlName, pdfName, callBack) => {
  const convert = cp.spawn('sh', ['./src/helpers/convert.sh', PDF_DIRNAME + htmlName, PDF_DIRNAME + pdfName]);
  convert.stdout.on('end', function () {
    console.log('stdout: pdf转换成功');
    callBack();
  });
};
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/front/refresh/assets', function (req, res) {
  const assetsPath = path.resolve(__dirname, '../static/dist');
  const reg = /^(?:main-)(.*)(?:\.js)$/;
  fs.readdir(assetsPath, function (err, file) {
    if (!file) {
      return res.status(404).send({message: 'file not fount'});
    }
    const mainFile = file.filter(name => reg.test(name))[0];
    if (mainFile) {
      const assetsHash = mainFile.match(reg)[1];
      return res.status(200).send({assetsHash: assetsHash});
    } else {
      return res.status(404).send({message: 'file not fount'});
    }
  });
});

app.get('/sendEmail', function (req, res) {
  console.log('req.query.reportId-----' + req.query.reportId);
  console.log(req.query.email);
  console.log(req.query.reportId);
  console.log(req.query.basicReportId);
  res.status = 200;
  res.json({
    message: '提交成功，稍后请注意查收邮件'
  });
  // 将PDF发送到邮箱
  const {types} = req.query;

  const routingStore = new RouterStore();
  allStores.routing = routingStore;
  let urlPanth = '';
  let params = '';
  let reportType = '';
  let pdfType = '';
  // let requestNumber = '';
  // let responseData = {};
  if (req.query.reportId) {
    urlPanth = '/api/pdf/report';
    params = {
      reportId: req.query.reportId,
    };
    reportType = '高级报告';
    pdfType = '贷前高级报告';
  } else if (req.query.basicReportId) {
    urlPanth = '/api/pdf/basicReport';
    params = {
      basicReportId: req.query.basicReportId,
    };
    reportType = '基础报告';
    pdfType = '贷前基础报告';
  } else if (req.query.analysisReportId) {
    urlPanth = '/api/pdf/analysis';
    params = {
      analysisReportId: req.query.analysisReportId,
    };
    reportType = '分析报告';
    pdfType = '贷中分析报告';
  }
  // 请求PDF下载方法

  pdfDownload(config.backendApi, urlPanth, params, types).then((responseData) => {
    console.log('请求完成-----');
    writeDataToFile('pdf', responseData);
    allStores.pdfStore.setTypes(types, reportType);
    allStores.clientStore.envConfig = config.target;
    allStores.pdfStore.getPdfDownData(responseData);
    const component = (
      <Provider { ...allStores } key="provided">
        <PdfBody />
      </Provider>
    );
    const reportHtml = ReactDOM.renderToString(<Html pdfDown="1" assets={webpackIsomorphicTools.assets()}
                                                     component={component} {...allStores} />);
    const companyName = responseData.companyName;
    const username = responseData.email;
    const timestamp = new Date().getTime();
    const htmlName = username + timestamp + '.html';
    const pdfName = username + timestamp + '.pdf';
    writeStrToHtml(htmlName, reportHtml, () => {
      html2Pdf(htmlName, pdfName, () => {
        upFileToQiniu(PDF_DIRNAME + username + timestamp, {
          pdfType,
          mail: req.query.email,
          client: config.target,

        });
      });
    }).catch((err) => {
      console.log('pdfDownload......err....' + err);
    });
  });
});
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
    .set('scm-token', req.cookies['scm-token'] || {});
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['scm-source'] = getPermissionMeta(config.target).scmSource;
  axios.defaults.headers.common['scm-token'] = req.cookies['scm-token'] || {};

  // 检查pdf路径
  const reqPathName = url.parse(req.url).pathname;
  if (reqPathName === '/pdfCheck') {
    checkPDF(req, res);
    return false;
  }
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
      if (reqPathName === '/pdfDown') {
        const routingStore = new RouterStore();
        allStores.routing = routingStore;
        let urlPanth = '';
        let params = '';
        let reportType = '';
        if (req.query.reportId) {
          urlPanth = '/api/pdf/report';
          params = {
            reportId: req.query.reportId,
          };
          reportType = '高级报告';
        } else if (req.query.basicReportId) {
          urlPanth = '/api/pdf/basicReport';
          params = {
            basicReportId: req.query.basicReportId,
          };
          reportType = '基础报告';
        } else if (req.query.analysisReportId) {
          urlPanth = '/api/pdf/analysis';
          params = {
            analysisReportId: req.query.analysisReportId,
          };
          reportType = '分析报告';
        }

        // 下载PDF
        pdfDownload(config.backendApi, urlPanth, params, req.query.type).then((responseData) => {
          console.log('请求完成-----');
          writeDataToFile('pdf', responseData);
          allStores.pdfStore.setTypes(req.query.type, reportType);
          allStores.clientStore.envConfig = config.target;
          allStores.pdfStore.getPdfDownData(responseData);
          const component = (
            <Provider { ...allStores } key="provided">
              <RouterContext {...renderProps} />
            </Provider>
          );
          const reportHtml = ReactDOM.renderToString(<Html pdfDown="1" assets={webpackIsomorphicTools.assets()}
                                                           component={component} {...allStores} />);
          const companyName = responseData.companyName;
          const username = responseData.email;
          const timestamp = new Date().getTime();
          const htmlName = username + timestamp + '.html';
          const pdfName = username + timestamp + '.pdf';
          writeStrToHtml(htmlName, reportHtml, () => {
            html2Pdf(htmlName, pdfName, () => {
              res.download(PDF_DIRNAME + pdfName, companyName + '.pdf', (err) => {
                // 删除pdf
                const del = cp.spawn('sh', ['./src/helpers/delPdf.sh', PDF_DIRNAME + htmlName, PDF_DIRNAME + pdfName]);
                del.stdout.on('end', function () {
                  console.log('stdout: pdf删除成功');
                });
                // res.download(PDF_DIRNAME + pdfName, companyName + '.pdf', (err) => {
                //   // 删除pdf
                //   const del = cp.spawn("sh", ['./src/helpers/delPdf.sh', PDF_DIRNAME + htmlName, PDF_DIRNAME + pdfName]);
                //   del.stdout.on('end', function () {
                //     console.log('stdout: pdf删除成功');
                //   });
              });
            });
          });
        }).catch((err) => {
          console.log(err)
        });
        // axios.get(config.backendApi + urlPanth, { params })
        //   .then((resp) => {
        //     writeDataToFile('pdf', resp.data);
        //     allStores.pdfStore.setTypes(params.types, reportType);
        //     allStores.clientStore.envConfig = config.target;
        //     allStores.pdfStore.getPdfDownData(resp.data);
        //     const component = (
        //       <Provider { ...allStores } key="provided">
        //         <RouterContext {...renderProps} />
        //       </Provider>
        //     );
        //     const reportHtml = ReactDOM.renderToString(<Html pdfDown="1" assets={webpackIsomorphicTools.assets()} component={component} {...allStores} />);
        //     const companyName = resp.data.companyName;
        //     const username = resp.data.email;
        //     const timestamp = new Date().getTime();
        //     const htmlName = username + timestamp + '.html';
        //     const pdfName = username + timestamp + '.pdf';
        //     writeStrToHtml(htmlName, reportHtml, () => {
        //       html2Pdf(htmlName, pdfName, () => {
        //         res.download(PDF_DIRNAME + pdfName, companyName + '.pdf', (err) => {
        //           // 删除pdf
        //           const del = cp.spawn("sh", ['./src/helpers/delPdf.sh', PDF_DIRNAME + htmlName, PDF_DIRNAME + pdfName]);
        //           del.stdout.on('end', function () {
        //             console.log('stdout: pdf删除成功');
        //           });
        //         });
        //       });
        //     });
        //   })
        //   .catch((err) => {
        //     console.log('pdfDown err', err.response.status);
        //   });
      } else if (reqPathName === '/') { // 访问首页
        allStores.clientStore.userInfo = {};
        allStores.clientStore.envConfig = config.target;
        allStores.loginStore.isShowLogin = false;
        allStores.leftBarStore.activeItem = '';
        // console.log(allStores.clientStore.userInfo.email, 'sssssssssssssssssssssssssss');
        // allStores.clientStore.envConfig = 'cfca_prod';
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
            allStores.clientStore.userInfo = resp.data;
            allStores.clientStore.envConfig = config.target;
            allStores.loginStore.isShowLogin = false;
            /*获取报告leftBar高亮*/
            if (reqPathName.indexOf('companyHome') >= 0) {
              let reportActiveItem = '';
              const arr = reqPathName.split('/');
              reportActiveItem = arr[arr.length - 1];
              allStores.leftBarStore.activeItem = reportActiveItem;
            }
            /*获取报告leftBar高亮*/
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
            const noLoginRoute = ['/', '/about', '/solution'];
            if (err.response.data.errorCode === 401007 && noLoginRoute.indexOf(reqPathName) === -1) {
              allStores.loginStore.isShowLogin = true;
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
