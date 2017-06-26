import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ErrorText from 'components/common/ErrorText';
import styles from './index.less';

function PosItemInfo({investmentStore, bannerStore}) {
  const companyName = bannerStore.bannerInfoData.name;
  const activeIndex = investmentStore.manageDataInfoIndex;
  const thisPosIttem = investmentStore.manageData[activeIndex];
  const name = thisPosIttem.name;
  const postion = thisPosIttem.positions.join('、');
  // 对外担任法人
  const frPositionTabels = [];
  const frPositionCount = thisPosIttem.frPositionList.length;
  thisPosIttem.frPositionList.map((item, idx) => {
    const showIndex = idx + 1;
    const regCap = isNaN(item.regCap) ? '--' : Number(item.regCap).toFixed(2);
    frPositionTabels.push(
      <table key={`${idx}frTable`} className={styles.tTable}>
        <tbody>
          <tr><td rowSpan="1000" width="40" className={styles.firstTd}>{showIndex}</td><td width="400px">企业名称：{item.entName}</td><td>状态：{item.entStatus}</td></tr>
          <tr><td>注册资本(万元)：{regCap}</td><td>成立日期：{item.esDate}</td></tr>
        </tbody>
      </table>
    );
  });
  // 对外投资
  const managementInvTabels = [];
  const managementInvCount = thisPosIttem.managementInvList.length;
  thisPosIttem.managementInvList.map((item, idx) => {
    const showIndex = idx + 1;
    const regCap = isNaN(item.regCap) ? '--' : Number(item.regCap).toFixed(2);
    const subConam = isNaN(item.subConam) ? '--' : Number(item.subConam).toFixed(2);
    managementInvTabels.push(
      <table key={`${idx}mmTable`} className={styles.tTable}>
        <tbody>
          <tr><td rowSpan="1000" width="40" className={styles.firstTd}>{showIndex}</td><td width="400px">投资企业名称：{item.entName}</td><td>状态：{item.entStatus}</td></tr>
          <tr><td>认缴出资额(万元)：{subConam}</td><td>出资比例：{item.fundedRatio}</td></tr>
          <tr><td>注册资本(万元)：{regCap}</td><td>成立日期：{item.esDate}</td></tr>
        </tbody>
      </table>
    );
  });
  // 对外任职
  const managementPositionTabels = [];
  const managementPositionCount = thisPosIttem.managementPositionList.length;
  thisPosIttem.managementPositionList.map((item, idx) => {
    const showIndex = idx + 1;
    const regCap = isNaN(item.regCap) ? '--' : Number(item.regCap).toFixed(2);
    managementPositionTabels.push(
      <table key={`${idx}mmTable`} className={styles.tTable}>
        <tbody>
          <tr><td rowSpan="1000" width="40" className={styles.firstTd}>{showIndex}</td><td width="400px">任职企业名称：{item.entName}</td><td>状态：{item.entStatus}</td></tr>
          <tr><td>担任职位：{item.otherPosition}</td><td>注册资本(万元)：{regCap}</td></tr>
          <tr><td>成立日期：{item.esDate}</td><td></td></tr>
        </tbody>
      </table>
    );
  });
  return (
    <div className={styles.box}>
      <div className={styles.boxTop}>
        <div className={styles.name}>{name}（{postion}）</div>
        <span className={styles.text}>主体公司名称：{companyName}</span>
      </div>
      <div className={styles.boxBody}>
        <div className={styles.tableWrap}>
          <div className={styles.tableName}>对外担任法人代表（{frPositionCount}）</div>
          {frPositionCount > 0 ? frPositionTabels : <ErrorText error={{message: '暂无信息'}}/>}
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableName}>对外投资（{managementInvCount}）</div>
          {managementInvCount > 0 ? managementInvTabels : <ErrorText error={{message: '暂无信息'}}/>}
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableName}>对外任职（{managementPositionCount}）</div>
          {managementPositionCount > 0 ? managementPositionTabels : <ErrorText error={{message: '暂无信息'}}/>}
        </div>
      </div>
    </div>
  );
}

PosItemInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('investmentStore', 'bannerStore')(observer(PosItemInfo));
