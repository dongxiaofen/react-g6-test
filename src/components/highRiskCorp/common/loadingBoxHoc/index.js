import React from 'react';
import { observer } from 'mobx-react';
import ActionBox from '../ActionBox';
import styles from './index.less';
function loadingBoxHoc(module) {
  const methodMap = {
    'industryDistribute': 'getIndustry',
    'latestEnterprise': 'getRecent',
    'enterpriseIncrement': 'getIncrement',
    'areaDistribute': 'getArea',
  };
  return (Comp) => {
    return observer(
      (props) => {
        const getIndustry = (params) => {
          props.highRiskCorpStore[methodMap[module]](params);
        };
        return (
          <div className={styles.box}>
            <ActionBox
              module={module}
              onChange={getIndustry}
              >
              <Comp {...props} />
            </ActionBox>
          </div>
        );
      }
    );
  };
}
export default loadingBoxHoc;
