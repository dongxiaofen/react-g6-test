import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

import imgLoanBefore from 'imgs/navbar/loanBefore.png';
import imgLoaning from 'imgs/navbar/loaning.png';
import imgLoanAfter from 'imgs/navbar/loanAfter.png';

function Menu({ routing }) {
  const config = [
    { parent: { module: '首页', route: 'accountProfile' } },
    { parent: { module: '搜索', route: 'search' } },
    {
      parent: { module: '核查'},
      children: [
        // { module: '个人投资任职', route: '/' },
        { module: '个人黑名单', route: 'relPerCheck' },
        { module: '企业经营核查', route: 'taxCheck' },
        // { module: '敬请期待', splitters: true, route: '' },
        { module: '企业黑名单', route: 'corpBlackList' },
        { module: '个人身份核验', route: 'personCheck' },
      ]
    },
    // {
    //   parent: { module: '头条' },
    //   children: [
    //     { module: '每日头条', route: 'riskHeadlines' },
    //     { module: '头条趋势', route: 'monitorStatistics' },
    //   ]
    // },
    // { parent: { module: '头条', route: 'riskHeadlines' } },
    {
      parent: { module: '报告', tagImg: imgLoanBefore},
      children: [
        { module: '基础报告', route: 'reportList?activeKey=basic' },
        { module: '高级报告', route: 'reportList?activeKey=advanced' },
      ]
    },
    {
      parent: { module: '分析', tagImg: imgLoaning},
      children: [
        { module: '多维综合评价', route: 'analysisList?activeKey=multi' },
        { module: '盈利能力分析', route: 'analysisList?activeKey=profit' },
        { module: '营运能力分析', route: 'analysisList?activeKey=operate' },
        { module: '成长能力分析', route: 'analysisList?activeKey=develop' },
        // { module: '敬请期待', splitters: true, route: '' },
        { module: '偿债能力分析', route: 'analysisList?activeKey=debt' },
        { module: '资产管理分析', route: 'analysisList?activeKey=capital' },
        { module: '现金流分析', route: 'analysisList?activeKey=cash' },
      ]
    },
    {
      parent: { module: '监控', tagImg: imgLoanAfter},
      children: [
        { module: '每日头条', route: 'riskHeadlines' },
        { module: '头条统计', route: 'monitorStatistics' },
        { module: '监控列表', route: 'monitorList' },
        { module: '预警企业', route: 'ruleCompany' },
        { module: '预警设置', route: 'ruleList' },
      ]
    },
    // {
    //   parent: { module: '企业' },
    //   children: [
    //     { module: '报告列表', route: 'reportManage' },
    //     { module: '监控列表', route: 'monitorList' },
    //   ]
    // },
    // {
    //   parent: { module: '预警' },
    //   children: [
    //     { module: '预警企业', route: 'ruleCompany' },
    //     { module: '预警设置', route: 'ruleList' },
    //   ]
    // },
    {
      parent: { module: '市场' },
      children: [
        { module: '招投标', route: 'bidMarket' },
        { module: '资产处置', route: 'assetTransaction' },
        { module: '高风险企业', route: 'highRiskCorp' },
      ],
    },
    // {
    //   parent: { module: '个人中心' },
    //   children: [
    //     { module: '账号中心', route: 'accountSetting' },
    //     { module: '搜藏列表', route: 'collection' },
    //   ],
    // },
  ];

  const routeToPage = (route) => {
    console.log(route);
    browserHistory.push(`/${route}`);
  };

  const childrenIsActiveFun = (route) => {
    const pathname = routing.location.pathname.substr(1);
    const search = routing.location.search;
    if (/\?/.test(route)) {
      return route === pathname + search;
    }
    return route.includes(pathname);
  };

  const parentItemIsActiveFun = (item) => {
    const pathname = routing.location.pathname.substr(1);
    const children = item.children;
    if (children && children.length > 0) {
      const isHas = children.find((child) => {
        return child.route.includes(pathname);
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
          if (childItem.splitters) {
            childrenArray.push(
              <div key={`child${childIdx}`} className={styles.splitters}>
              <span>{childItem.module}</span>
              </div>
            );
          } else if (childItem.deving) {
            childrenArray.push(
              <div key={`child${childIdx}`} className={styles.deving}>
              {childItem.module}
              </div>
            );
          } else {
            const childrenIsActive = childrenIsActiveFun(childItem.route);
            const itemCss = childrenIsActive ? styles.childItemActive : styles.childItem;
            childrenArray.push(
              <div key={`child${childIdx}`} className={itemCss} onClick={routeToPage.bind(this, childItem.route)}>
              {childItem.module}
              </div>
            );
          }
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
            <i className="fa fa-angle-down"></i>
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
            {parent.tagImg ? <img src={parent.tagImg} className={styles.navbarItemTag}/> : null}
            {parentItemDOM}
            {childrenOutput}
          </div>
        );
      } else {
        output.push(
          <div key={`parent${pIdx}`} className={styles.navbarItem}>
            {parent.tagImg ? <img src={parent.tagImg} className={styles.navbarItemTag}/> : null}
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
