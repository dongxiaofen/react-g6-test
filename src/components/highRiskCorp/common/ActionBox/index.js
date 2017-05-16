import React from 'react';
import { observer, inject } from 'mobx-react';
import {
  IndustrySelect,
  AreaSelect,
  RegCapSelect,
  TimeSelect
} from '../select';
import styles from './index.less';
const titleMap = {
  'industryDistribute': '高风险企业行业分布',
  'latestEnterprise': '近期高风险企业公示',
  'enterpriseIncrement': '高风险企业每月增量',
  'areaDistribute': '高风险企业地域分布',
};
function ActionBox(props) {
  const module = props.module;
  const title = titleMap[module];
  const hasIndustrySelect = ['enterpriseIncrement', 'areaDistribute'];
  const hasTimeSelect = ['industryDistribute', 'enterpriseIncrement', 'areaDistribute'];
  const hasRegCapSelect = ['industryDistribute', 'enterpriseIncrement', 'areaDistribute'];
  const hasAreaSelect = ['industryDistribute', 'latestEnterprise', 'enterpriseIncrement'];
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.heightCol}>
          <h3 className={styles.title}>{title}</h3>
          {hasTimeSelect.includes(module) ?
            <div className={styles.timeBox}>
              <TimeSelect {...props} />
            </div> : null}
        </div>
        <div className="clearfix">
          {hasIndustrySelect.includes(module) ? <IndustrySelect {...props} /> : null}
          {hasAreaSelect.includes(module) ? <AreaSelect {...props} /> : null}
          {hasRegCapSelect.includes(module) ? <RegCapSelect {...props} /> : null}
        </div>
      </div>
      <hr className={styles.headerLine} />
      <div className={styles.chartsBox}>
        {props.children}
      </div>
    </div>
  );
}
export default inject('highRiskCorpStore')(observer(ActionBox));
