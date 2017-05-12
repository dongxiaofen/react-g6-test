import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Popover from 'antd/lib/popover';
import styles from './index.less';

function RuleCompany({data}) {
  const text = [];
  let number = '';
  if (data && data.rule && data.rule.companyNames && data.rule.companyNames.length > 0) {
    number = data.rule.companyNames.length;
    data.rule.companyNames.map((obj, idx)=> {
      text.push(
        <div className={styles.single} key={`${idx}names`}>{obj}</div>
      );
    });
  }
  const textAll = (
    <div className={styles.all}>
      {text}
    </div>
  );
  return (
    <div className={styles.box}>
      <Popover placement="right" content={textAll}>
        <div className={styles.riskLabel}>
          <span>应用企业: {number}家</span>
          <i></i>
        </div>
      </Popover>
    </div>
  );
}

RuleCompany.propTypes = {
  data: PropTypes.object,
};
export default observer(RuleCompany);
