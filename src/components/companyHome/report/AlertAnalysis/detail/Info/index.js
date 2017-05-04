import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';

function Info({alertAnalysisStore}) {
  const info = alertAnalysisStore.detailData.info;
  let relation = '';
  let hasRelation = false;
  let detail = {};
  if (info.alertType === 'SYS_RULE') {
    detail = alertAnalysisStore.detailData.detail.detail[0];
    const type = detail.type;
    hasRelation = info.alertType === 'SYS_RULE' && (type === 'judgeInfo' || type === 'dishonesty') && detail.relation;
    relation = detail.relation && detail.relation.length > 0 ? `（${detail.relation.join('／')}）` : '';
  }
  return (
    <div className={styles.wrap}>
      <p className={styles.description}>{`预警依据：${info.description}`}</p>
      {hasRelation ?
        <div className={styles.relateCompany}>{`关联公司：${detail.companyName}${relation}`}</div>
        : ''
      }
    </div>
  );
}

Info.propTypes = {
  foo: PropTypes.string,
};
export default inject('alertAnalysisStore')(observer(Info));
