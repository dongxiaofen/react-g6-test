import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import KeyValue from './KeyValue';

function CheckItem({itemData, routing, relPerCheckStore}) {
  const { match } = itemData;
  const { monitorId, reportId, analysisReportId } = routing.location.query;
  const showId = relPerCheckStore.showId;
  const idCardArr = relPerCheckStore.idCard;
  const personCheckId = itemData.id;
  const showStr = showId.get(personCheckId) ? 'show' : 'hide';
  const idCard = showStr === 'show' && idCardArr.get(personCheckId) ? idCardArr.get(personCheckId) : itemData.idCard;
  const matchStr = match ? 'match' : 'noMatch';
  const cssStr = `${matchStr}_${showStr}`;
  const viewDetail = () => {
    if (matchStr === 'match') {
      window.open(`/personReport?personCheckId=${personCheckId}`);
    }
  };
  const showIdCard = (evt) => {
    evt.stopPropagation();
    const show = idCardArr.get(personCheckId);
    if (show) {
      relPerCheckStore.toggleExpand('showId', personCheckId, false);
      relPerCheckStore.toggleExpand('idCard', personCheckId, '');
    } else {
      relPerCheckStore.toggleExpand('showId', personCheckId, true);
      relPerCheckStore.getIdCard({monitorId, reportId, analysisReportId, personCheckId});
      // 10s后自动隐藏身份证号码
      setTimeout(() => {
        relPerCheckStore.toggleExpand('showId', personCheckId, false);
        relPerCheckStore.toggleExpand('idCard', personCheckId, '');
      }, 10000);
    }
  };
  return (
    <div className={match ? styles.wrapperMatch : styles.wrapper} onClick={viewDetail}>
      <div className={styles.line1}>
        <span className={match ? styles.perNameBlue : styles.perNameBlack}>{itemData.name}</span>
        <span className={styles.relation}>{itemData.relationship}</span>
        <span className={match ? styles.idCardBlack : styles.idCardGay}>身份证号码{idCard}</span>
        <span className={styles[cssStr]} onClick={showIdCard}></span>
      </div>
      {
        match ?
          <div className={styles.line2}>
          <KeyValue keys="老赖记录" values={itemData.deadbeat} match={match} />
          <KeyValue keys="失信被执行" values={itemData.dishonesty} match={match} />
            <KeyValue keys="被执行人" values={itemData.executed} match={match} />
            <span className={styles.checkTime}>核查时间 {itemData.checkDateTime || '无'}</span>
          {/* <KeyValue keys="犯罪记录" values={itemData.criminalRecord} match={match} /> */}
        </div> : <div className={styles.noMatch_text}>
          <span>身份证号与姓名：匹配失败</span>
          <span className={styles.checkTime}>核查时间 {itemData.checkDateTime || '无'}</span>
        </div>
      }
    </div>
  );
}

CheckItem.propTypes = {
  keys: PropTypes.string,
  itemData: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('routing', 'relPerCheckStore')(observer(CheckItem));
