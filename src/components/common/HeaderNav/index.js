import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
// import iconPolice from 'imgs/footer/icon-police.png';

function Header({headerStore, clientStore, routing}) {
  const handleLogout = () => {
    clientStore.loginOut();
  };
  const handleNav = (nav) => {
    headerStore.navChange(nav);
    routing.push({pathname: `/${nav}`});
  };
  const handleInnerNav = (innerNav, idx) => {
    const ParentIdx = headerStore.navList.findIndex(item => (item.key === headerStore.currentNav));
    // if (headerStore.navList[ParentIdx].children[idx].active) {
    //   return;
    // }
    headerStore.innerNavChange(innerNav, idx, ParentIdx);
    routing.push({pathname: `/${headerStore.currentNav}/${innerNav}`});
  };
  const createNav = () => {
    return headerStore.navList.map((item, idx) => {
      return (headerStore.currentNav === item.key ?
        <li key={item.key + idx} className={`${styles['nav-li']} ${styles.active}`}>
          <span className={styles['nav-name']}>{item.label}</span>
          <span className={styles['left-icon']}></span>
          <span className={styles['bottom-icon']}></span>
        </li> :
        <li key={item.key + idx} className={styles['nav-li']} onClick={handleNav.bind(this, item.key)}>
          <span>{item.label}</span>
        </li>);
    });
  };
  const createInnerNav = () => {
    const parentNav = headerStore.currentNav;
    const index = headerStore.navList.findIndex(item => item.key === parentNav);
    const innerNav = headerStore.navList[index].children;
    return innerNav.map(({name, value, active}, idx) => {
      return (<li key ={idx} className={`${styles['inner-item']} ${active ? styles.active : ''}`} onClick={handleInnerNav.bind(this, value, idx)}>{name}</li>);
    });
  };
  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <div className={styles['user-content']}>
          {
            clientStore.userInfo.email ?
            <div>
              <spab className={styles.name}>您好，{clientStore.userInfo.email}</spab>
              <a className={styles.logout} onClick={handleLogout}>退出</a>
            </div> :
            <span>登录</span>
          }
        </div>
      </div>
      <div className={styles['header-navbox']}>
        <div className={`clearfix ${styles['header-nav']}`}>
          <div className={styles.logo}>logo</div>
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
