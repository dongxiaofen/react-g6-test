import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
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
} from './module';
function Content({alertAnalysisStore}) {
  const createModule = () => {
    const detailData = alertAnalysisStore.detailData;
    const info = detailData.info;
    const detail = detailData.detail;
    if (info.alertType === 'RULE') {
      const singleDetail = detail[detailData.activeIndex];
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
          return <JudgeDoc data={singleDetail} type={info.alertType}/>;
        case 'NEWS':
          return <News data={singleDetail}/>;
        case 'COURT_LITIGATION':
          return <LitigationAssets data={singleDetail}/>;
        default:
          return null;
      }
    }else if (info.alertType === 'SYS_RULE') {
      let ruleId = detail.ruleId;
      if (ruleId === 1 || ruleId === 2 || ruleId === 5 || ruleId === 6) {
        ruleId = 1;
      }else if (ruleId === 3 || ruleId === 4) {
        ruleId = 3;
      } else if (ruleId >= 13 && ruleId <= 31) {
        ruleId = 13;
      }else if (ruleId >= 32 && ruleId <= 50) {
        ruleId = 32;
      }
      switch (ruleId) {
        case 1:
          return <JudgeDoc data={detail} type={info.alertTyp}/>;
        case 3:
          return <DishonestInfo data={detail} type={info.alertTyp}/>;
        case 7:
          return <Rule7 data={detail} />;
        case 8:
          return <ErrorInfo data={detail} />;
        case 9:
          return <ScopeAlter data={detail} type={info.alertTyp}/>;
        case 10:
          return <Rule10 data={detail} />;
        case 11:
          return <Rule11 data={detail} />;
        case 12:
          return <Rule12 data={detail} />;
        case 13:
          return <Rule13To31 data={detail} />;
        case 32:
          return <Rule32To50 data={detail} />;
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
export default inject('alertAnalysisStore')(observer(Content));
