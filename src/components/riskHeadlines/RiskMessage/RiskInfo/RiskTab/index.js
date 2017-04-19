import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RiskTab({riskHeadlinesStore}) {
  const events = riskHeadlinesStore.events;
  const filterParams = riskHeadlinesStore.filterParams;
  const changeModule = (dimGroupType, count) => {
    if (count > 0) {
      riskHeadlinesStore.riskUpdateValue('events', 'params.dimGroupType', dimGroupType);
      const monitorId = events.info.monitorId;
      const index = events.params.index;
      const from = filterParams.from;
      const to = filterParams.to;
      riskHeadlinesStore.getCompanyEvents(monitorId, {index, from, to, dimGroupType});
    }
  };
  const tabConf = [
    {countKey: 'corpCount', paramStr: 'CORP', label: '工商'},
    {countKey: 'legalCount', paramStr: 'LEGAL', label: '法务'},
    {countKey: 'newsCount', paramStr: 'NEWS', label: '新闻'},
    {countKey: 'operationCount', paramStr: 'OPERATION', label: '经营'},
    {countKey: 'teamCount', paramStr: 'TEAM', label: '团队'},
    {countKey: 'stockCount', paramStr: 'STOCK', label: '上市'},
  ];
  const createTab = (moduleData)=>{
    const output = [];
    tabConf.forEach((obj, objIdx) => {
      let count = moduleData[obj.countKey];
      let tabCss = styles.tabItem;
      if (count > 0) {
        tabCss = obj.paramStr === events.params.dimGroupType ? styles.tabActItem : styles.tabItem;
      } else {
        tabCss = styles.tabDisable;
      }
      count = count === undefined ? <i className="fa fa-spin fa-spinner"></i> : count;
      output.push(
        <div key={objIdx}
          className={tabCss}
          onClick={changeModule.bind(null, obj.paramStr, count)}>
          {`${obj.label}`}
          <span>（{count}）</span>
        </div>
      );
    });
    return output;
  };
  const riskHeadlinesData = events.info;
  return (
    <div className={styles.wrap}>
      {createTab(riskHeadlinesData)}
    </div>
  );
}
export default observer(RiskTab);
