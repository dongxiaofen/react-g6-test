import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import styles from './index.less';
import Tooltip from 'antd/lib/tooltip';
function LeftBar({ leftBarStore, bannerStore, routing }) {
  const { monitorId, reportId, analysisReportId, companyName, companyType } = routing.location.query;
  const activeMenu = leftBarStore.activeMenu;
  const stockCode = bannerStore.stockCode;
  const barConf = leftBarStore.barConf;
  const getReportType = () => {
    // 一共四种报告 free, report, main, relation
    let reportType;
    if (monitorId) {
      if (companyType === 'MAIN') {
        reportType = 'main';
      } else {
        reportType = 'relation';
      }
    }
    if (reportId) {
      reportType = 'report';
    }
    if (analysisReportId) {
      reportType = 'analysisReport';
    }
    if (companyName) {
      reportType = 'free';
    }
    return reportType;
  };
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
  const geneBar = () => {
    const menuRow = [];
    const reportType = getReportType();
    barConf.forEach((menuObj) => {
      const accessMenu = menuObj.contain.includes(reportType);
      const arrowCss = activeMenu.includes(menuObj.menuKey) ? styles.arrow + ` ${styles.arrowAnim}` : styles.arrow;
      const menuCss = accessMenu ? styles.menuCss : styles.menuDisCss;
      const itemRow = [];
      menuRow.push(
        <Tooltip key={menuObj.menuText} title={accessMenu ? '' : menuObj.helpInfo} placement="right">
          <div
            className={menuCss}
            onClick={changeMenu.bind(this, menuObj.menuKey, accessMenu)}
          >
            {menuObj.menuText}
            <i className={`fa fa-angle-down ${arrowCss}`}></i>
          </div>
        </Tooltip>
      );
      menuObj.children.forEach((itemObj, itemIdx) => {
        const accessItem = itemObj.contain.includes(reportType);
        let itemCss = leftBarStore.activeItem === itemObj.menuKey ? styles.itemActCss : styles.itemCss;
        itemCss = accessItem ? itemCss : styles.itemDisCss;
        itemCss = activeMenu.includes(menuObj.menuKey) ? itemCss : styles.hide;
        if (itemObj.menuKey !== 'stock' || stockCode) {
          itemRow.push(
            <Tooltip key={itemObj.menuText + itemIdx} title={accessItem ? '' : itemObj.helpInfo} placement="right">
              <div
                className={itemCss}
                onClick={changeItem.bind(this, itemObj.menuKey, accessItem)}
              >
                {itemObj.menuText}
              </div>
            </Tooltip>
          );
        }
      });
      menuRow.push(itemRow);
    });
    return menuRow;
  };
  return (
    <div className={styles.wrap}>
      {geneBar()}
    </div>
  );
}

LeftBar.propTypes = {
  leftBarStore: PropTypes.object,
  bannerStore: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('leftBarStore', 'bannerStore', 'routing')(observer(LeftBar));
