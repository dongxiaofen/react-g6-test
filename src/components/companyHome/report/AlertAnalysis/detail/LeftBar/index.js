import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function LeftBar({alertAnalysisStore, routing}) {
  const moduleData = alertAnalysisStore.detailData;
  const data = moduleData.detail;
  const activeIndex = moduleData.activeIndex;
  const tabTop = moduleData.tabTop;
  const page = moduleData.page;
  const {monitorId, reportId} = routing.location.query;
  let companyType = 'monitor';
  const companyId = monitorId || reportId;
  if (reportId) {
    companyType = 'analysisReport';
  }
  console.log(reportId, companyType);
  const changeTab = (index) => {
    alertAnalysisStore.changeValue('detailData.activeIndex', index);
    alertAnalysisStore.resetHtml();
    const pattern = data[activeIndex].pattern;
    if (pattern === 'NEWS') {
      alertAnalysisStore.getNewsDetail(companyType, companyId);
    } else if (pattern === 'JUDGMENT') {
      alertAnalysisStore.getJudgeDocDetail(companyType, companyId);
    }
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
          <div className={styles.time}>{item.alterDt}</div>
        </div>
      );
    });
  };
  const prevClick = () => {
    if (page <= 1) {
      return false;
    }
    alertAnalysisStore.changeValue('detailData.page', page - 1);
  };
  const nextClick = () => {
    if (page * 8 >= data.length) {
      return false;
    }
    alertAnalysisStore.changeValue('detailData.page', page + 1);
  };
  const prevCss = page <= 1 ? styles.arrowUpDis : styles.arrowUp;
  const nextCss = page * 8 >= data.length ? styles.arrowDownDis : styles.arrowDown;
  return (
    <div className={styles.tabBox}>
      <i className={prevCss} onClick={prevClick}></i>
      <div className={styles.overBox}>
        <div className={styles.itemBox} style={{top: tabTop}}>
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
