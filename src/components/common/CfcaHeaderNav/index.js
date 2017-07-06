import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import pathval from 'pathval';
import { Link } from 'react-router';
import { runInAction } from 'mobx';

function CfcaHeaderNav({loginStore}) {
  // const envConfig = pathval.getPathValue(clientStore, 'envConfig');
  const showLoginOnClick = () => {
    runInAction('显示登录框', () => {
      pathval.setPathValue(loginStore, 'isShowLogin', true);
    });
  };

  return (
    // <div className={`clearfix ${styles['header-navbar']} ${this.props.isHeaderScroll ? styles['header-navbar-scroll'] : ''}`}>
    <div className={`clearfix ${styles['header-navbar']}`}>
      <div className={`pull-left ${styles.logo}`}></div>
      <div className={`clearfix ${styles['header-navbar-content']}`}>
        <ul className={`clearfix ${styles['header-navbar-menu']}`}>
          <li className={this.props.home ? styles.active : ''}>
            <a href="/">
              首页
              <div className={styles['header-navbar-menuBD']}></div>
            </a>
          </li>
          <li className={this.props.solution ? styles.active : ''}>
            <Link to="/solution">
              解决方案
              <div className={styles['header-navbar-menuBD']}></div>
            </Link>
          </li>
          <li className={this.props.about ? styles.active : ''}>
            <Link to="/about">
              关于我们
              <div className={styles['header-navbar-menuBD']}></div>
            </Link>
          </li>
        </ul>
        <div className={styles['header-navbar-btnGroup']}>
          {/* {
            envConfig === 'cfca_prod'
              ?
              ''
              :
              <button
                className={`fs5 ${styles['download-app']}`}
                onClick={showDownloadOnClick}>
                下载APP
              </button>
          } */}
          <button
            className={`fs5 ${styles.login}`}
            onClick={showLoginOnClick}>
            {/* <i className={styles['login-icon']}></i> */}
            登录
          </button>
        </div>
      </div>
    </div>
  );
}

CfcaHeaderNav.propTypes = {
  clientStore: PropTypes.object,
  logintStore: PropTypes.object,
};
export default inject('clientStore', 'loginStore')(observer(CfcaHeaderNav));