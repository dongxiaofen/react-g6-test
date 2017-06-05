import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function LeftBar({alertAnalysisStore, routing}) {
  const moduleData = alertAnalysisStore.detailData;
  const data = moduleData.detail;
  const activeIndex = moduleData.activeIndex;
  const tabTop = moduleData.tabTop;
  const page = moduleData.page;
  const {monitorId, analysisReportId} = routing.location.query;
  let companyType = 'monitor';
  const companyId = monitorId || analysisReportId;
  if (analysisReportId) {
    companyType = 'analysisReport';
  }
  const changeTab = (index) => {
    alertAnalysisStore.changeValue('detailData.activeIndex', index);
    alertAnalysisStore.resetHtml();
    if (moduleData.info.alertType === 'RULE') {
      const pattern = data[activeIndex].pattern;
      if (pattern === 'NEWS') {
        alertAnalysisStore.getNewsDetail(companyType, companyId);
      } else if (pattern === 'JUDGMENT') {
        alertAnalysisStore.getJudgeDocDetail(companyType, companyId, data[activeIndex].content);
      }
    } else {
      if (data[activeIndex].detail[0].type === 'judgeInfo' && data[activeIndex].detail[0].judgeInfo) {
        alertAnalysisStore.getJudgeDocDetail(companyType, companyId, data[activeIndex].detail[0].judgeInfo);
      }
    }
  };
  const modifyDate = (item)=> {
    if (moduleData.info.alertType === 'RULE') {
      return item.alterDt;
    }
    return item.time.slice(0, 10);
  };
  const createTabs = () => {
    return data.map((item, index) => {
      const itemCss = index === activeIndex ? styles.activeItem : styles.item;
      return (
        <div
          key={index}
          className={itemCss}
          onClick={changeTab.bind(null, index)}
          >
          <div className={styles.time}>{modifyDate(item)}</div>
        </div>
      );
    });
  };
  const getDetail = (params)=> {
    const alertType = moduleData.info.alertType;
    const ruleMap = {
      RULE: 'rule',
      SYS_RULE: 'sysRule'
    };
    let url;
    let type;
    if (monitorId) {
      url = `/api/monitor/${monitorId}/alert/${ruleMap[alertType]}/${moduleData.info.id}`;
      type = 'monitor';
    } else {
      url = `/api/analysisReport/${analysisReportId}/alert/${ruleMap[alertType]}/${moduleData.info.id}`;
      type = 'report';
    }
    alertAnalysisStore.getAlertDetail(url, type, monitorId || analysisReportId, moduleData.info, params);
  };
  const prevClick = () => {
    if (page <= 1) {
      return false;
    }
    if (moduleData.info.alertType === 'RULE') {
      getDetail({index: page - 1, size: 8});
    }
    alertAnalysisStore.changeValue('detailData.page', page - 1);
  };
  const nextClick = () => {
    const maxNum = moduleData.info.alertType === 'RULE' ? alertAnalysisStore.detailData.orgData.totalElements : data.length;
    if (page * 8 >= maxNum) {
      return false;
    }
    if (moduleData.info.alertType === 'RULE') {
      getDetail({index: page + 1, size: 8});
    }
    alertAnalysisStore.changeValue('detailData.page', page + 1);
  };
  const maxNum = moduleData.info.alertType === 'RULE' ? alertAnalysisStore.detailData.orgData.totalElements : data.length;
  const prevCss = page <= 1 ? styles.arrowUpDis : styles.arrowUp;
  const nextCss = page * 8 >= maxNum ? styles.arrowDownDis : styles.arrowDown;
  if (data.length < 2) {
    return null;
  }
  return (
    <div className={styles.tabBox}>
      <i className={prevCss} onClick={prevClick}></i>
      <div className={styles.overBox}>
        <div className={styles.itemBox} style={{top: moduleData.info.alertType === 'RULE' ? 0 : tabTop}}>
          {createTabs()}
        </div>
      </div>
      <i className={nextCss} onClick={nextClick}></i>
    </div>
  );
}

LeftBar.propTypes = {
  foo: PropTypes.string,
};
export default inject('alertAnalysisStore', 'routing')(observer(LeftBar));
