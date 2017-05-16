import React from 'react';
import { observer, inject } from 'mobx-react';
import IndustrySelect from '../select';
import AreaSelect from './select';
import RegCapSelect from './select';
import TimeSelect from './select';
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
              <TimeSelect />
            </div> : ''}
        </div>
        <div className="clearfix">
          {hasIndustrySelect.includes(module) ? <IndustrySelect /> : ''}
          {hasAreaSelect.includes(module) ? <AreaSelect /> : ''}
          {hasRegCapSelect.includes(module) ? <RegCapSelect /> : ''}
        </div>
      </div>
      <hr className={styles.headerLine} />
      <div className={styles.chartsBox}>
        {props.children}
      </div>
    </div>
  );
}
export inject('highRiskCorpStore')(observer(ActionBox));
