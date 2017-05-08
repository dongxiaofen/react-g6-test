import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function LegendBar({ }) {
  return (
    <div className={styles.box}>
      <div className={styles.tip}>
        <i className="fa fa-info-circle"></i>
        &nbsp;点击连线,查看关联关系
          </div>
      <span className={styles.legendNotice}>
        <span className={styles.legendMain}></span> 主体公司
        <span className={styles.legendCompany}></span> 关联公司
        <span className={styles.legendPerson}></span> 关联人
        <span className={styles.legendBlacklist}></span> 高风险企业
        <span className={styles.legendOhter}></span> 其他
      </span>
    </div>
  );
}

LegendBar.propTypes = {
  foo: PropTypes.string,
};
export default observer(LegendBar);
