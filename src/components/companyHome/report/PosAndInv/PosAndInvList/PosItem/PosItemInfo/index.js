import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import ErrorText from 'components/common/ErrorText';
import styles from './index.less';
import SimpleTable from 'components/common/report/SimpleTable';

function PosItemInfo({investmentStore, bannerStore}) {
  const companyName = bannerStore.bannerInfoData.name;
  const activeIndex = investmentStore.manageDataInfoIndex;
  const thisPosIttem = investmentStore.manageData[activeIndex];
  const name = thisPosIttem.name;
  const postion = thisPosIttem.positions.length < 1 ? '' : `（${thisPosIttem.positions.join('、')}）`;
  const modifyTextNumber = (value)=> {
    if (isNaN(value)) {
      return '--';
    }
    return Number(value).toFixed(2) === '0.00' ? '--' : Number(value).toFixed(2);
  };
  const modifyRato = (value) => {
    return value && value !== '0.00%' ? value : '--';
  };
  // 对外担任法人
  const frPositionCount = thisPosIttem.frPositionList.length;
  const frPosdata = {
    meta: {
      body: [
        [{ 'key': 'entName', 'colSpan': '1' }, { 'key': 'entStatus', 'colSpan': '1'}],
        [{'key': 'regCap', 'colSpan': '1', 'hide': true, 'modifyBlock': modifyTextNumber }, { 'key': 'esDate', 'colSpan': '2'}],
      ],
      dict: 'frPositionList',
      items: thisPosIttem.frPositionList,
      maxCols: 2,
      hasNumber: true,
      error: frPositionCount < 1,
      module: '对外投资任职'
    },
  };
  // 对外投资
  const managementInvCount = thisPosIttem.managementInvList.length;
  const invData = {
    meta: {
      body: [
        [{ 'key': 'entName', 'colSpan': '1'}, {'key': 'entStatus', 'colSpan': '1'}],
        [{ 'key': 'subConam', 'width': '4', 'modifyBlock': modifyTextNumber}, {'key': 'fundedRatio', 'width': '4', 'modifyBlock': modifyRato}],
        [{ 'key': 'regCap', 'width': '4', 'modifyBlock': modifyTextNumber}, {'key': 'esDate', 'width': '4' }]
      ],
      dict: 'frinvList',
      items: thisPosIttem.managementInvList,
      maxCols: 2,
      hasNumber: true,
      error: managementInvCount < 1,
      module: '对外投资任职'
    },
  };
  // 对外任职
  const managementPositionCount = thisPosIttem.managementPositionList.length;
  const posData = {
    meta: {
      body: [
        [{ 'key': 'entName', 'colSpan': '1' }, { 'key': 'entStatus', 'colSpan': '1'}],
        [{ 'key': 'otherPosition', 'colSpan': '1' }, {'key': 'regCap', 'colSpan': '1', 'hide': true, 'modifyBlock': modifyTextNumber }],
        [{ 'key': 'esDate', 'colSpan': '2'}],
      ],
      dict: 'frPositionList',
      items: thisPosIttem.managementPositionList,
      maxCols: 2,
      hasNumber: true,
      error: managementPositionCount < 1,
      module: '对外投资任职'
    },
  };
  return (
    <div className={styles.box}>
      <div className={styles.boxTop}>
        <div className={styles.name}>{name}{postion}</div>
        <span className={styles.text}>主体公司名称：{companyName}</span>
      </div>
      <div className={styles.boxBody}>
        <div className={styles.tableWrap}>
          <div className={styles.tableName}>担任法人的企业（{frPositionCount}）</div>
          <SimpleTable meta={frPosdata.meta} module="maFr"/>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableName}>投资企业（{managementInvCount}）</div>
          <SimpleTable meta={invData.meta} module="maIve"/>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableName}>任职企业（{managementPositionCount}）</div>
          <SimpleTable meta={posData.meta} module="maPosition"/>
        </div>
      </div>
    </div>
  );
}

PosItemInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('investmentStore', 'bannerStore')(observer(PosItemInfo));
