import React from 'react';
import { observer, inject } from 'mobx-react';
import RelTime from './RelTime';
import ActionWrap from '../ActionWrap';
import styles from './index.less';
function RelTr({data, mainData, index, monitorListStore, uiStore, linkJumpStore}) {
  const viewReport = () => {
    linkJumpStore.getNameType(data.companyName);
  };
  const handleRelName = () => {
    const { companyName } = uiStore.uiState.monitorList.params;
    if (companyName) {
      const regExp = new RegExp(companyName, 'g');
      const result = data.companyName.replace(regExp, match => `<span style="color: #42A5F5">${match}</span>`);
      return <span className={styles.relName} dangerouslySetInnerHTML={{__html: result}} onClick={viewReport} />;
    }
    return <span className={styles.relName} onClick={viewReport}>{data.companyName}</span>;
  };
  const relationshipTypeDict = {
    CORP_BRANCH: '分公司',
    EXTERNAL_INVESTMENT: '对外投资',
    FR_POSITION_RELATED: '法人代表相关',
    CORPORATE_EXECUTIVES: '高管',
    FR_POSITION: '法人代表',
    SHARE_HOLDER: '股东',
    USER_SUPPLIER: '供应商',
    USER_CUSTOMER: '客户',
    USER_HISTORY_RELEVANCE: '历史关联',
    USER_SAME_PLAINTIFF_DEFENDANT: '共同原被告',
    USER_LITIGATION_OPPOSITE: '诉讼对立方',
    USER_CORPORATE_EXECUTIVES_RELATED: '高管相关',
    USER_SHARE_HOLDER_RELATED: '股东相关',
    USER_HISTORY_RELEVANCE_RELATED: '历史关联相关',
    USER_SAME_PLAINTIFF_DEFENDANT_RELATED: '共同原被告相关',
    USER_LITIGATION_OPPOSITE_RELATED: '诉讼对立方相关',
    USER_EXTERNAL_INVESTMENT_RELATED: '对外投资相关',
    USER_FR_POSITION_RELATED: '法人代表相关',
    USER_CORPORATE_EXECUTIVES: '高管',
    USER_SHARE_HOLDER: '股东',
    USER_EXTERNAL_INVESTMENT: '对外投资',
  };
  return (
    <div className={styles.rTr}>
      <div className={styles.companyWrap}>
        <span className={styles.relationship}>
          ［关系：{relationshipTypeDict[data.relationship]}］
        </span>
        {handleRelName()}
      </div>
      <div className={styles.timeWrap}>
        <RelTime values={data.startTm} />
        <RelTime values={data.stopTm} />
        <RelTime values={data.latestTs} />
      </div>
      <ActionWrap
        data={data}
        mainData={mainData}
        index={index}
        monitorListStore={monitorListStore}
        relation="relation" />
    </div>
  );
}
export default inject('monitorListStore', 'uiStore', 'linkJumpStore')(observer(RelTr));
