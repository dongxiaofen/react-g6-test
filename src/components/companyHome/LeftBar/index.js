import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { runInAction } from 'mobx';
import styles from './index.less';
import Tooltip from 'antd/lib/tooltip';
const helpInfo1 = '创建高级查询报告或主体监控报告后，可查看该板块信息';
const helpInfo2 = '创建主体监控报告后，可查看该板块信息';
const barConf = [
  {
    menuText: '信息报告',
    menuKey: 'report',
    children: [
      { menuText: '企业基本信息', menuKey: 'corpDetail', helpInfo: helpInfo1, contain: ['main', 'report', 'relation', 'free'] },
      { menuText: '上市披露', menuKey: 'stock', helpInfo: helpInfo1, contain: ['main', 'report'] },
      { menuText: '风险信息', menuKey: 'risk', helpInfo: helpInfo1, contain: ['main', 'report', 'relation', 'free'] },
      { menuText: '新闻信息', menuKey: 'internet', helpInfo: helpInfo1, contain: ['main', 'report', 'relation'] },
      { menuText: '经营信息', menuKey: 'assets', helpInfo: helpInfo1, contain: ['main', 'report'] },
      { menuText: '团队信息', menuKey: 'team', helpInfo: helpInfo1, contain: ['main', 'report'] },
    ],
    helpInfo: helpInfo1,
    contain: ['main', 'report', 'relation', 'free'],
  },
  {
    menuText: '关联网络',
    menuKey: 'network',
    children: [
      { menuText: '关联关系', menuKey: 'network', helpInfo: helpInfo1, contain: ['main', 'report'] },
      { menuText: '风险关系', menuKey: 'blacklistNetwork', helpInfo: helpInfo1, contain: ['main', 'report'] },
    ],
    helpInfo: helpInfo1,
    contain: ['main', 'report'],
  },
  {
    menuText: '趋势分析',
    menuKey: 'trendAnalyse',
    children: [
      { menuText: '事件时间轴', menuKey: 'eventLine', helpInfo: helpInfo2, contain: ['main'] },
    ],
    helpInfo: helpInfo2,
    contain: ['main'],
  },
  {
    menuText: '企业现勘',
    menuKey: 'corprationXk',
    children: [
      { menuText: '现勘记录', menuKey: 'xkRecord', helpInfo: helpInfo2, contain: ['main'] },
    ],
    helpInfo: helpInfo2,
    contain: ['main'],
  },
];
function LeftBar({ leftBarStore, routing }) {
  const { monitorId, reportId, companyName, companyType } = routing.location.query;
  const { activeMenu, stockCode } = leftBarStore;
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
  const changeItem = (itemKey, menuKey, access) => {
    console.log(itemKey, menuKey, access);
    if (!access) return false;
    runInAction('切换报告二级目录', () => {
      if (!activeMenu.includes(menuKey)) {
        activeMenu.push(menuKey);
      }
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
                onClick={changeItem.bind(this, itemObj.menuKey, menuObj.menuKey, accessItem)}
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
  foo: PropTypes.string,
};
export default inject('leftBarStore', 'routing')(observer(LeftBar));
