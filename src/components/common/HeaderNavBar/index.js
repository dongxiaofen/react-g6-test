import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Link } from 'react-router';

function HeaderNavBar() {
  // const envConfig = this.props.client.get('envConfig');
  const envConfig = 'cfca_prod';

  const showLoginOnClick = () => {
    this.props.commonBoundAC.updateValue(
      ['isShowLogin'],
      true,
      'LOGIN_UPDATE_VALUE'
    );
  };

  const showDownloadOnClick = () => {
    document.getElementById('download-box').style.display = 'block';
  };

  return (
    <div className={`clearfix ${styles['header-navbar']} ${this.props.isHeaderScroll ? styles['header-navbar-scroll'] : ''}`}>
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
          {
            envConfig === 'cfca_prod'
              ?
              ''
              :
              <button
                className={`fs5 ${styles['download-app']}`}
                onClick={showDownloadOnClick}>
                下载APP
              </button>
          }
          <button
            className={`fs5 ${styles.login}`}
            onClick={showLoginOnClick}>
            登录
          </button>
        </div>
      </div>
    </div>
  );
}

HeaderNavBar.propTypes = {
  foo: PropTypes.string,
};
export default observer(HeaderNavBar);
