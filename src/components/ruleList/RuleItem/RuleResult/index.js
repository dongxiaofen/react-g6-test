import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleResult({data}) {
  let companyCount = '';
  let blackList = '';
  if (data && data.eventStatistic) {
    if (data.eventStatistic.companyCount >= 0) {
      companyCount = (<span>
        命中我的企业<i>{data.eventStatistic.companyCount}</i>家，
      </span>);
    }
    if (data.eventStatistic.blackList >= 0) {
      blackList = (<span>
        命中系统高风险企业<i>{data.eventStatistic.blackList}</i>家
      </span>);
    }
  }
  return (
    <div className={styles.box}>
      命中效果：{companyCount}{blackList}
    </div>
  );
}

RuleResult.propTypes = {
  data: PropTypes.object,
};
export default observer(RuleResult);
