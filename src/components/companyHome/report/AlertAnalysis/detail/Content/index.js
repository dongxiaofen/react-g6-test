import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import {Rule10, Rule11, Rule12, Rule7, Rule32To50, ScopeAlter, ErrorInfo, Rule13To31} from './module';
function Content({alertAnalysisStore}) {
  const createModule = () => {
    const detail = alertAnalysisStore.detailData.detail;
    let ruleId = detail.ruleId;
    if (ruleId >= 13 && ruleId <= 31) {
      ruleId = 13;
    }else if (ruleId >= 32 && ruleId <= 50) {
      ruleId = 32;
    }
    switch (detail.ruleId) {
      case 7:
        return <Rule7 data={detail} />;
      case 8:
        return <ErrorInfo data={detail} />;
      case 9:
        return <ScopeAlter data={detail} />;
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
        return <div>12</div>;
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
