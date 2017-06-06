import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import styles from './index.less';
import Button from 'components/lib/button';
function LeftBar({ leftBarStore, bannerStore, routing, companyHomeStore}) {
  const activeMenu = leftBarStore.activeMenu;
  const stockCode = bannerStore.stockCode;
  const barConf = leftBarStore.barConf;
  const changeMenu = (menuKey, access) => {
    if (!access) return false;
    runInAction('切换报告一级目录', () => {
      const index = activeMenu.indexOf(menuKey);
      if (index >= 0) {
        activeMenu.splice(index, 1);
      } else {
        activeMenu.push(menuKey);
      }
    });
  };
  const changeItem = (itemKey, access) => {
    if (!access) return false;
    runInAction('切换报告二级目录', () => {
      leftBarStore.activeItem = itemKey;
    });
    routing.push({
      pathname: `/companyHome/${itemKey}`,
      query: routing.location.query,
    });
  };
  const isLock = (itemObj, type) => {
    if (type === 'report' && itemObj.lock) {
      return false;
    }
    if (type === 'loaning' && itemObj.lock) {
      return false;
    }
    if (type === 'monitor' && itemObj.lock) {
      return false;
    }
    return true;
  };
  const geneBar = (type) => {
    const menuRow = [];
    // onst reportType = leftBarStore.getReportType(routing);
    barConf[type].forEach((menuObj) => {
      const accessMenu = isLock(menuObj, type);
      const arrowCss = activeMenu.includes(menuObj.menuKey) ? styles.arrow + ` ${styles.arrowAnim}` : styles.arrow;
      const menuCss = accessMenu ? styles.menuCss : styles.menuDisCss;
      const itemRow = [];
      if (menuObj.children) {
        menuRow.push(
          <div key={menuObj.menuKey}
            className={menuCss}
            onClick={changeMenu.bind(this, menuObj.menuKey, accessMenu)}>
            {menuObj.menuText}
            <i className={`fa fa-angle-down ${arrowCss}`}></i>
          </div>
        );
        menuObj.children.forEach((itemObj, itemIdx) => {
          const accessItem = isLock(itemObj, type);
          let itemCss = leftBarStore.activeItem === itemObj.menuKey ? styles.itemActCss : styles.itemCss;
          itemCss = accessItem ? itemCss : styles.itemDisCss;
          itemCss = activeMenu.includes(menuObj.menuKey) ? itemCss : styles.hide;
          if (itemObj.menuKey !== 'stock' || stockCode) {
            itemRow.push(
              <div
                key={itemObj.menuText + itemIdx}
                className={itemCss}
                onClick={changeItem.bind(this, itemObj.menuKey, accessItem)}
              >
                {itemObj.menuText}
                {accessItem ? '' : <i className={styles.lock}></i>}
              </div>
            );
          }
        });
      } else {
        menuRow.push(
          <div
            key={menuObj.menuKey}
            className={menuCss}
            onClick={changeItem.bind(this, menuObj.menuKey, true)}
          >
            {menuObj.menuText}
            {accessMenu ? '' : <i className={styles.lock}></i>}
          </div>
        );
      }
      menuRow.push(itemRow);
    });
    return menuRow;
  };
  const companyName = routing.location.query.companyName;
  return (
    <div>
      <div className={styles.wrap}>
        <div className={`${styles.title} clearfix`}>
          <p className={styles.reportType}>贷前基础报告</p>
          <Button btnType="primary" className={styles.btnReport}>升级报告</Button>
        </div>
        {geneBar('report')}
      </div>
      <div className={styles.wrap}>
        <div className={`${styles.title} clearfix`}>
          <p className={styles.reportType}>贷中分析</p>
          <Button btnType="primary" className={styles.btnMonitor}>创建分析</Button>
        </div>
        {geneBar('loaning')}
      </div>
      <div className={styles.wrap}>
        <div className={`${styles.title} clearfix`}>
          <p className={styles.reportType}>贷后监控</p>
          <Button
            btnType="primary"
            className={styles.btnMonitor}
            onClick={companyHomeStore.createMonitor.bind(null, companyName)}>
            加入监控
          </Button>
        </div>
        {geneBar('monitor')}
      </div>
      <div className={`${styles.wrap} ${styles.recordWrap}`}>
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
        <span className={styles.record}>调查记录</span>
      </div>
    </div>
  );
}

LeftBar.propTypes = {
  leftBarStore: PropTypes.object,
  bannerStore: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('leftBarStore', 'bannerStore', 'routing', 'companyHomeStore')(observer(LeftBar));
