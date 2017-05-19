import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import ALERT_CONFIG from 'dict/alertCard';
function CardHeader({data, hasSecondType, cardType, modifyDate, module}) {
  const itemData = data.items;
  const createTypeName = () => {
    if (hasSecondType) {
      return data.typeName ? `${ALERT_CONFIG.cardsConfig[itemData.pattern]}-${data.typeName}` : ALERT_CONFIG.cardsConfig[itemData.pattern];
    }
    return data.typeName;
  };
  const typeName = createTypeName();
  const companyName = itemData.relatedMonitorCompanyName || itemData.mainMonitorCompanyName;
  if (cardType === 'modal') {
    return (
      <div>
        <div className="clearfix">
          <p className={styles.modalTypeName}>{typeName}</p>
          <div className={styles.modalDate}>
            <span>{data.date.label}：</span>{modifyDate(data.date.value)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.top}>
      <div className={styles.mainTitle}>
        <span className={styles.typeName}>{module === 'timeAxis' ? companyName + '-' + typeName : typeName}</span>
      </div>
    </div>
  );
}
export default observer(CardHeader);
