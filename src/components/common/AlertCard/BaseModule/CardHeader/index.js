import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Grade from './Grade';
import ALERT_CONFIG from 'dict/alertCard';
import CompanyName from './CompanyName'; // 报告时间轴才会有的组件，待测试
function CardHeader({data, module, hasSecondType, cardType, modifyDate}) {
  const itemData = data.items;
  const createTypeName = () => {
    if (hasSecondType) {
      return data.typeName ? `${ALERT_CONFIG.cardsConfig[itemData.pattern]}-${data.typeName}` : ALERT_CONFIG.cardsConfig[itemData.pattern];
    }
    return data.typeName;
  };
  const typeName = createTypeName();
  const rCompanyName = itemData.relatedMonitorCompanyName;
  const relation = rCompanyName && rCompanyName.length > 0 ? '关联' : '主体';
  const companyType = relation === '关联' ? styles.relatedType : styles.mainType;
  const companyName = rCompanyName && rCompanyName.length > 0 ? rCompanyName : itemData.mainMonitorCompanyName;
  const firstType = `${itemData.dimGroupName.substr(0, 2)}详情`;
  if (cardType === 'modal') {
    return (
      <div>
        <h2 className={styles.firstType}>{firstType}</h2>
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
      <div className={relation === '主体' ? styles.mainTitle : styles.relationTitle}>
        <span className={styles.typeName}>{typeName}</span>
        {relation === '主体' ? <Grade itemData={itemData} /> : ''}
      </div>
      {
        module === 'headLine' ? ''
        :
        <div className={styles.nameAndTimeWrap}>
          <div className={styles.companys}>
            <span className={companyType}>
              <span>[</span>
              <span className={styles.companyType}>{relation}</span>
              <span>]</span>
            </span>
            <CompanyName item={itemData} companyName={companyName} />
          </div>
        </div>
      }
    </div>
  );
}
export default observer(CardHeader);
