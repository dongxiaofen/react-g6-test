import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import styles from './index.less';
import Button from 'components/lib/button';
function LeftBar({ leftBarStore, bannerStore, routing, companyHomeStore}) {
  const activeMenu = leftBarStore.activeMenu;
  const stockCode = bannerStore.stockCode;
  const barConf = leftBarStore.barConf;
  let timer;
  const changeMenu = (menuKey, access) => {
    if (!access) return false;
    runInAction('切换报告一级目录', () => {
      const index = activeMenu.indexOf(menuKey);
      if (index >= 0) {
        activeMenu.splice(index, 1);
      } else {
        activeMenu.pop();
        activeMenu.push(menuKey);
      }
    });
  };
  const backToTopOnClick = () => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      const toTop = document.body.scrollTop || document.documentElement.scrollTop;
      const speed = Math.ceil(toTop / 5);
      document.documentElement.scrollTop = document.body.scrollTop = toTop - speed;
      if (toTop <= 0) {
        clearInterval(timer);
      }
    }, 10);
  };
  const changeItem = (itemKey, access, type) => {
    if (!access) {
      if (type === 'report') {
        companyHomeStore.openUpReportModal();
      } else if (type === 'loaning') {
        companyHomeStore.openLoanModal();
      } else if (type === 'monitor') {
        companyHomeStore.createMonitor();
      }
    } else {
      runInAction('切换报告二级目录', () => {
        leftBarStore.activeItem = itemKey;
      });
      routing.push({
        pathname: `/companyHome/${itemKey}`,
        query: routing.location.query,
      });
      backToTopOnClick();
    }
  };
  const isLock = (itemObj, type) => {
    const reportInfo = companyHomeStore.reportInfo;
    if (itemObj.lock) {
      if (type === 'report' && reportInfo.reportId === '') {
        return false;
      }
      if (type === 'loaning' && !reportInfo.dimensions.includes(itemObj.moduleKey)) {
        return false;
      }
      if (type === 'monitor' && reportInfo.monitorId === '') {
        return false;
      }
    }
    return true;
  };
  const geneBar = (type) => {
    const menuRow = [];
    // onst reportType = leftBarStore.getReportType(routing);
    barConf[type].forEach((menuObj) => {
      const accessMenu = isLock(menuObj, type);
      const itemRow = [];
      if (menuObj.children) {
        const arrowCss = activeMenu.includes(menuObj.menuKey) ? styles.arrow + ` ${styles.arrowAnim}` : styles.arrow;
        const menuCss = accessMenu ? styles.menuCss : styles.menuDisCss;
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
                onClick={changeItem.bind(this, itemObj.menuKey, accessItem, type)}
              >
                {itemObj.menuText}
                {accessItem ? '' : <i className={styles.lock}></i>}
              </div>
            );
          }
        });
      } else {
        let menuCss = accessMenu ? styles.menuCss1 : styles.menuDisCss1;
        menuCss = leftBarStore.activeItem === menuObj.menuKey ? styles.menuCssAct1 : menuCss;
        menuRow.push(
          <div
            key={menuObj.menuKey}
            className={menuCss}
            onClick={changeItem.bind(this, menuObj.menuKey, accessMenu, type)}
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
  const reportTitle = companyHomeStore.reportInfo.reportId !== '' ? '贷前高级报告' : '贷前基础报告';
  // 现勘记录路由
  const changeNowRecord = () => {
    routing.push({
      pathname: `/companyHome/nowRecord`,
      query: routing.location.query,
    });
    backToTopOnClick();
  };
  return (
    <div>
      <div className={styles.wrap}>
        <div className={`${styles.title} clearfix`}>
          <p className={styles.reportType}>{reportTitle}</p>
          {
            companyHomeStore.reportInfo.reportId === '' ?
            <Button btnType="primary"
              className={styles.btnReport}
              onClick={companyHomeStore.openUpReportModal}>升级报告</Button>
            : ''
          }
        </div>
        {geneBar('report')}
      </div>
      <div className={styles.wrap}>
        <div className={`${styles.title} clearfix`}>
          <p className={styles.reportType}>贷中分析</p>
          {
            companyHomeStore.reportInfo.dimensions.length < 4 ?
            <Button
              btnType="primary"
              className={styles.btnMonitor}
              onClick={companyHomeStore.openLoanModal}>创建分析</Button>
            : ''
          }
        </div>
        {geneBar('loaning')}
      </div>
      <div className={styles.wrap}>
        <div className={`${styles.title} clearfix`}>
          <p className={styles.reportType}>贷后监控</p>
          {
            companyHomeStore.reportInfo.monitorId === '' ?
            <Button
              btnType="primary"
              className={styles.btnMonitor}
              onClick={companyHomeStore.createMonitor.bind(null, companyName)}>
              加入监控
            </Button>
            : ''
          }
        </div>
        {geneBar('monitor')}
      </div>
      <div
        onClick={changeNowRecord}
        className={`${styles.wrap} ${styles.recordWrap}`}>
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
