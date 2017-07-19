import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import {
  Rule10,
  Rule11,
  Rule12,
  Rule7,
  Rule32To50,
  Rule13To31,
  ScopeAlter,
  ErrorInfo,
  CheckInfo,
  DishonestInfo,
  Fyannouncement,
  JudgeDoc,
  Ktannouncement,
  LitigationAssets,
  News,
  ExcuteInfo,
  Position,
} from './module';
function Content({reportAxisStore, monitorAlertStore, routing}) {
  const pathname = routing.location.pathname;
  const dataStore = pathname === '/companyHome/monitorAlert' ? monitorAlertStore : reportAxisStore;
  const createModule = () => {
    const detailData = dataStore.detailData;
    const info = detailData.info;
    const detail = detailData.detail;
    if (detailData.loading) {
      return <AnimateLoading />;
    }
    if (info.alertType !== 'SYS_RULE') {
      const singleDetail = detail[detailData.activeIndex];
      // console.log(singleDetail, 'singleDetail-----------');
      // if (!singleDetail) { return }
      switch (singleDetail.pattern) {
        case 'COURT_NOTICE':
          return <Ktannouncement data={singleDetail} />;
        case 'CORP_ALTER':
          return <ScopeAlter data={singleDetail} type={info.alertType}/>;
        case 'CORP_ABNORMAL':
          return <ErrorInfo data={singleDetail} type={info.alertType}/>;
        case 'CORP_CHECK':
          return <CheckInfo data={singleDetail} />;
        case 'COURT_ANNOUNCEMENT':
          return <Fyannouncement data={singleDetail} />;
        case 'EXECUTE':
          return <ExcuteInfo data={singleDetail} />;
        case 'DISHONESTY':
          return <DishonestInfo data={singleDetail} type={info.alertType}/>;
        case 'JUDGMENT':
          return <JudgeDoc data={singleDetail} type={info.alertType} dataStore={dataStore}/>;
        case 'NEWS':
          return <News data={singleDetail} dataStore={dataStore}/>;
        case 'COURT_LITIGATION':
          return <LitigationAssets data={singleDetail}/>;
        default:
          return null;
      }
    } else if (info.alertType === 'SYS_RULE') {
      const ruleId = detail[detailData.activeIndex].ruleId;
      let typeId = 0;
      if (ruleId === 1 || ruleId === 2 || ruleId === 5 || ruleId === 6) {
        typeId = 1;
      } else if (ruleId === 3 || ruleId === 4) {
        typeId = 3;
      } else if (ruleId >= 13 && ruleId <= 31) {
        typeId = 13;
      } else if (ruleId >= 32 && ruleId <= 50) {
        typeId = 32;
      } else if (ruleId >= 84 && ruleId <= 86) {
        typeId = 84;
      } else {
        typeId = ruleId;
      }
      switch (typeId) {
        case 1:
          return <JudgeDoc data={detail[detailData.activeIndex]} type={info.alertType} ruleId={ruleId} dataStore={dataStore}/>;
        case 3:
          return <DishonestInfo data={detail[detailData.activeIndex]} type={info.alertType} ruleId={ruleId}/>;
        case 7:
          return <Rule7 data={detail[detailData.activeIndex]} />;
        case 8:
          return <ErrorInfo data={detail[detailData.activeIndex]} type={info.alertType}/>;
        case 9:
          return <ScopeAlter data={detail[detailData.activeIndex]} type={info.alertType}/>;
        case 10:
          return <Rule10 data={detail[detailData.activeIndex]} />;
        case 11:
          return <Rule11 data={detail[detailData.activeIndex]} />;
        case 12:
          return <Rule12 data={detail[detailData.activeIndex]} />;
        case 13:
          return <Rule13To31 data={detail[detailData.activeIndex]} />;
        case 32:
          return <Rule32To50 data={detail[detailData.activeIndex]} />;
        case 77:
          return <Position data={detail[detailData.activeIndex]} />;
        case 84:
          return <News ruleType={typeId} data={detail[detailData.activeIndex]} dataStore={dataStore}/>;
        default:
          return null;
      }
    }
  };
  return (
    <div className={styles.wrap}>
      {createModule()}
    </div>
  );
}

Content.propTypes = {
  foo: PropTypes.string,
};
export default inject('reportAxisStore', 'monitorAlertStore', 'routing')(observer(Content));
