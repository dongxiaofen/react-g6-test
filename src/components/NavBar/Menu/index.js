import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function Menu({ routing }) {
  const config = [
    { parent: { module: '首页', route: 'myHomePage' } },
    {
      parent: { module: '头条' },
      children: [
        { module: '每日头条', route: 'riskHeadlines' },
        { module: '头条趋势', route: 'monitorStatistics' },
      ]
    },
    {
      parent: { module: '企业' },
      children: [
        { module: '企业查询', route: 'searchCompany' },
        { module: '报告列表', route: 'reportManage' },
        { module: '监控列表', route: 'monitorList' },
      ]
    },
    {
      parent: { module: '预警' },
      children: [
        { module: '预警企业', route: 'ruleCompany' },
        { module: '预警设置', route: 'ruleList' },
      ]
    },
    {
      parent: { module: '市场' },
      children: [
        { module: '招投标', route: 'bidMarket' },
        { module: '资产交易', route: 'poorAssets' },
        { module: '风险企业', route: 'blackList' },
      ],
    },
    {
      parent: { module: '设置' },
      children: [
        { module: '预警设置', route: 'ruleList' },
        { module: '账号设置', route: 'accountSetting' },
      ],
    },
  ];

  const routeToPage = (route) => {
    browserHistory.push(`/${route}`);
  };

  const childrenIsActiveFun = (route) => {
    const pathname = routing.location.pathname.substr(1);
    return route === pathname;
  };

  const parentItemIsActiveFun = (item) => {
    const pathname = routing.location.pathname.substr(1);
    const children = item.children;
    if (children && children.length > 0) {
      const isHas = children.find((child) => {
        return child.route === pathname;
      });
      return isHas !== undefined ? true : false;
    }
    return item.parent.route === pathname;
  };

  const parentItemMouseOver = (pIdx) => {
    const parentItemRef = this.refs[`parentItem${pIdx}`];
    const preClass = parentItemRef.className;
    const newClass = `${preClass} ${styles.parentItemHover}`;
    parentItemRef.className = newClass;
  };

  const parentItemMouseOut = (pIdx) => {
    const parentItemRef = this.refs[`parentItem${pIdx}`];
    const newClass = parentItemRef.className.split(' ')[0];
    parentItemRef.className = newClass;
  };

  const createItem = () => {
    const output = [];
    config.forEach((item, pIdx) => {
      let childrenOutput = '';
      const childrenArray = [];
      const parent = item.parent;
      const children = item.children;
      if (children && children.length > 0) {
        children.forEach((childItem, childIdx) => {
          const childrenIsActive = childrenIsActiveFun(childItem.route);
          const itemCss = childrenIsActive ? styles.childItemActive : styles.childItem;
          childrenArray.push(
            <div key={`child${childIdx}`} className={itemCss} onClick={routeToPage.bind(this, childItem.route)}>
              {childItem.module}
            </div>
          );
        });
        childrenOutput = <div key={`childBox${pIdx}`} className={styles.childBox}>{childrenArray}</div>;
      }
      const parentItemIsActive = parentItemIsActiveFun(item) ? styles.parentItemActive : styles.parentItem;
      const parentItemDOM = parent.route
        ?
        <div className={parentItemIsActive} onClick={routeToPage.bind(this, parent.route)}>{parent.module}</div>
        :
        <div className={parentItemIsActive}>
          {parent.module}
          <span className={styles.parentIcon}>
            <i className="fa fa-chevron-down"></i>
          </span>
        </div>;
      if (childrenOutput) {
        output.push(
          <div
            key={`parent${pIdx}`}
            ref={`parentItem${pIdx}`}
            className={styles.navbarItem}
            onMouseOver={parentItemMouseOver.bind(this, pIdx)}
            onMouseOut={parentItemMouseOut.bind(this, pIdx)}>
            {parentItemDOM}
            {childrenOutput}
          </div>
        );
      } else {
        output.push(
          <div key={`parent${pIdx}`} className={styles.navbarItem}>
            {parentItemDOM}
          </div>
        );
      }
    });
    return output;
  };
  return (
    <div>
      <div className={styles.logo}>
        <div className={styles.logoImg}></div>
      </div>
      <div className={`clearfix ${styles['navbar-menu']}`}>
        {createItem()}
      </div>
    </div>
  );
}

Menu.propTypes = {
  routing: PropTypes.object,
};
export default observer(Menu);
