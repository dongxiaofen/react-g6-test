import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function BasicList({ routing, alertData }) {
  const degreeHandle = (type, degree) => {
    if (!degree) {
      return '';
    }
    if (type === 'border') {
      return styles[`AlertEachBorder${degree}`];
    }
  };

  const turnToMonitor = (monitorId, risk, blackCompanyName) => {
    const { push } = routing;
    if (!monitorId) return;
    if (risk === 'risk') {
      push(`/companyHome?monitorId=${monitorId}&companyType=MAIN&module=network&secondModule=blacklistNetwork&blackCompanyName=${blackCompanyName}`);
    } else {
      push(`/companyHome?monitorId=${monitorId}&companyType=MAIN`);
    }
  };

  const borderStyle = degreeHandle('border', 'LOW');
  return (
    <li className={styles.AlertEach}>
      <div className={styles.AlertEachDiv + ' ' + borderStyle}>
        <div className={styles.AlertEachKind}>
         <span>
          <span>{'无'}</span>
          <label>（'')}）</label>
         </span>
        </div>
        <div className={styles.AlertEachInfo}>
                  <span style={{width: '50%'}}>
                    企业：<label><a onClick={turnToMonitor.bind(this, 14)}>{'无'}</a></label>
                  </span><span style={{width: '25%'}}>
                    类型：<label>{'无'}</label>
                  </span><span style={{textAlign: 'right', width: '25%'}}>
                    时间：{'无'}
                  </span>
        </div>
      </div>
    </li>
  );
}

BasicList.propTypes = {
  props: PropTypes.object,
};
export default inject('routing')(observer(BasicList));
