import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import {toJS} from 'mobx';
/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    pdfDown: PropTypes.string,
    isDev: PropTypes.bool,
  };
  prepareStore(allStore) {
    const keyArr = Object.keys(allStore);
    const output = {};
    keyArr.map((key)=>{
      output[key] = toJS(allStore[key]);
    });
    return output;
  }
  render() {
    const {assets, component, ...allStore} = this.props;
    const stores = this.prepareStore(allStore);
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <title>星象</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
          {/* styles (will be present only in production with webpack extract text plugin) */}

          <link href="../vendors/css/font-awesome.css"
            rel="stylesheet" type="text/css" charSet="UTF-8"/>
          <link href="../vendors/css/antd.css"
            rel="stylesheet" type="text/css" charSet="UTF-8"/>
          <link href="../vendors/css/preload.css"
            rel="stylesheet" type="text/css" charSet="UTF-8"/>
          {
            Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key}
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
            )
          }
          {/* <link href="/vendors/css/antd.css" media="screen, projection"
                rel="stylesheet" type="text/css" charSet="UTF-8"/> */}
          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}

        </head>
        <body>
          <div id="content" style={{height: '100%'}} dangerouslySetInnerHTML={{__html: content}}/>
          {this.props.pdfDown === '1' ? '' :
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(stores)};`}} charSet="UTF-8"/>
          }
          {this.props.pdfDown === '1' ? '' :
            <script src={assets.javascript['common.js']} charSet="UTF-8"/>
          }

          {this.props.pdfDown === '1' ? '' :
            <script src={assets.javascript.main} charSet="UTF-8"/>
          }
        </body>
      </html>
    );
  }
}
// {this.props.pdfDown === '1' ? '' :
//             <script src={`//cdn.bootcss.com/react/15.4.2/react.${this.props.isDev ? '' : 'min.'}js`}></script>
//           }
//           {this.props.pdfDown === '1' ? '' :
//             <script src={`//cdn.bootcss.com/react/15.4.2/react-dom.${this.props.isDev ? '' : 'min.'}js`}></script>
//           }
//           {this.props.pdfDown === '1' ? '' :
//             <script src={`//cdn.bootcss.com/react-router/3.0.2/ReactRouter.${this.props.isDev ? '' : 'min.'}js`}></script>
//           }
