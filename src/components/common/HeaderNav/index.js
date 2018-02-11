import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import logo from 'imgs/header/logo.png';

function Header({headerStore, clientStore, routing}) {
  const handleLogout = () => {
    clientStore.loginOut();
  };
  const handleNav = (nav, idx) => {
    headerStore.navChange(nav);
    routing.push({pathname: `/${clientStore.version}/${headerStore.navList[idx].children[0].value}`});
  };
  const gotoHome = () => {
    // routing.push({pathname: `/`});
    location.href = `/${clientStore.version}/introduce`;
  };
  const handleInnerNav = (innerNav, idx) => {
    const ParentIdx = headerStore.navList.findIndex(item => (item.key === headerStore.currentNav));
    headerStore.innerNavChange(innerNav, idx, ParentIdx);
    routing.push({pathname: `/${clientStore.version}/${innerNav}`});
  };
  const createNav = () => {
    return headerStore.navList.map((item, idx) => {
      return (headerStore.currentNav === item.key ?
        <li key={item.key + idx} className={`${styles['nav-li']} ${styles.active}`}>
          <span className={styles['nav-name']}>{item.label}</span>
          <span className={styles['left-icon']}></span>
          <span className={styles['bottom-icon']}></span>
        </li> :
        <li key={item.key + idx} className={styles['nav-li']} onClick={handleNav.bind(this, item.key, idx)}>
          <span>{item.label}</span>
        </li>);
    });
  };
  const createInnerNav = () => {
    const parentNav = headerStore.currentNav;
    const index = headerStore.navList.findIndex(item => item.key === parentNav);
    // console.log(parentNav, 'parentNav', index, 'index');
    const innerNav = headerStore.navList[index].children;
    return innerNav.map(({name, value, active}, idx) => {
      return (<li key ={idx} className={`${styles['inner-item']} ${active ? styles.active : ''}`} onClick={handleInnerNav.bind(this, value, idx)}>{name}</li>);
      // if (!hidden) {
      // }
    });
  };
  const gotoVersion = (version) => {
    const pathname = `/${version}/introduce`;
    routing.push({pathname: pathname});
    clientStore.updateValue('version', version);
  };
  const getVersion = () => {
    let output = null;
    if (clientStore.version === 'v1') {
      output = (<span className={styles.versionBox} onClick={gotoVersion.bind(null, 'v2')}>新版</span>);
    } else {
      if (clientStore.isOldClient) {
        output = (<span className={styles.versionBox} onClick={gotoVersion.bind(null, 'v1')}>旧版</span>);
      }
    }
    return output;
  };
  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <div className={styles['user-content']}>
          {
            clientStore.userInfo.email ?
            <div>
              <span className={styles.name}>您好，{clientStore.userInfo.email}</span>
              {
                getVersion()
              }
              <a className={styles.logout} onClick={handleLogout}>退出</a>
            </div> :
            <span>登录</span>
          }
        </div>
      </div>
      <div className={styles['header-navbox']}>
        <div className={`clearfix ${styles['header-nav']}`}>
          <div className={styles.logo} onClick={gotoHome}>
            <img src={logo} />
            <div className={styles.name}>
              <p className={styles['name-cn']}>星象<span className={styles.pots}>.</span>数据平台</p>
              <p className={styles['name-en']}>business.socialcredits.cn</p>
            </div>
          </div>
          <ul className={styles.navList}>
            {createNav()}
          </ul>
        </div>
      </div>
      <div className={styles['inner-navbox']}>
        <ul className={styles['inner-nav']}>
          {createInnerNav()}
        </ul>
      </div>
    </div>
  );
}

Header.propTypes = {
  headerStore: PropTypes.object,
};
export default inject('headerStore', 'clientStore', 'routing')(observer(Header));
