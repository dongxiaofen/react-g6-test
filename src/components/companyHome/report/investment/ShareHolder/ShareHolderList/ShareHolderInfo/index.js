import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
// import styles from './index.less';
import SimpleTable from 'components/common/report/SimpleTable';
function ShareHolderInfo({investmentStore, bannerStore}) {
  const companyName = bannerStore.bannerInfoData.name;
  const {shareholdInfoIdx, shareholders} = investmentStore;
  const shareholdItem = shareholders[shareholdInfoIdx];
  const {name, shareHolder, shareHolderPositionFrList, shareHolderInvList, shareHolderPositionList} = shareholdItem;
  const invesStr = shareHolder && shareHolder.subConam ? `投资金额 ${Number(shareHolder.subConam).toFixed(2)}万元（${shareHolder.fundedRatio}）` : '--';
  const isFrPosError = shareHolderPositionFrList.length < 1;
  const isInvError = shareHolderInvList.length < 1;
  const isPosError = shareHolderPositionList.length < 1;
  const modifyTextNumber = (value)=> {
    if (value) {
      return Number(value).toFixed(2) === '0.00' ? '--' : Number(value).toFixed(2);
    }
    return '--';
  };
  const modifyRato = (value) => {
    return value && value !== '0.00%' ? value : '--';
  };
  const frPosdata = {
    meta: {
      body: [
        [{ 'key': 'entName', 'colSpan': '1' }, { 'key': 'entStatus', 'colSpan': '1'}],
        [{'key': 'regCap', 'colSpan': '1', 'hide': true, 'modifyBlock': modifyTextNumber }, { 'key': 'esDate', 'colSpan': '2'}],
      ],
      dict: 'frPositionList',
      items: shareHolderPositionFrList,
      maxCols: 2,
      hasNumber: true,
      error: isFrPosError
    },
  };
  const invData = {
    meta: {
      body: [
        [{ 'key': 'entName', 'colSpan': '1'}, {'key': 'entStatus', 'colSpan': '1'}],
        [{ 'key': 'subConam', 'width': '4', 'modifyBlock': modifyTextNumber}, {'key': 'fundedRatio', 'width': '4', 'modifyBlock': modifyRato}],
        [{ 'key': 'regCap', 'width': '4', 'modifyBlock': modifyTextNumber}, {'key': 'esDate', 'width': '4' }]
      ],
      dict: 'frinvList',
      items: shareHolderInvList,
      maxCols: 2,
      hasNumber: true,
      error: isInvError
    },
  };
  const posData = {
    meta: {
      body: [
        [{ 'key': 'entName', 'colSpan': '1' }, { 'key': 'entStatus', 'colSpan': '1'}],
        [{ 'key': 'position', 'colSpan': '1' }, {'key': 'regCap', 'colSpan': '1', 'hide': true, 'modifyBlock': modifyTextNumber }],
        [{ 'key': 'esDate', 'colSpan': '2'}],
      ],
      dict: 'frPositionList',
      items: shareHolderPositionList,
      maxCols: 2,
      hasNumber: true,
      error: isPosError
    },
  };
  return (
    <div className={styles.box}>
      <div className={styles.boxTop}>
        <div className={styles.name}>{name} {invesStr}</div>
        <span className={styles.text}>主体公司名称：{companyName}</span>
      </div>
      <div className={styles.tableWrap}>
        <div className={styles.tableName}>对外担任法人代表（{shareHolderPositionFrList.length}）</div>
        <SimpleTable meta={frPosdata.meta} module="shPositionList"/>
      </div>
      <div className={styles.tableWrap}>
        <div className={styles.tableName}>对外投资（{shareHolderInvList.length}）</div>
        <SimpleTable meta={invData.meta} module="shinvList"/>
      </div>
      <div className={styles.tableWrap}>
        <div className={styles.tableName}>对外任职（{shareHolderPositionList.length}）</div>
        <SimpleTable meta={posData.meta} module="shPosList"/>
      </div>
    </div>
  );
}
export default inject('investmentStore', 'bannerStore')(observer(ShareHolderInfo));
