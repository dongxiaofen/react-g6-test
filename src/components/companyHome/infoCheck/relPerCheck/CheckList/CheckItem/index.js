import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import KeyValue from './KeyValue';

function CheckItem({itemData, routing, relPerCheckStore}) {
  const { match } = itemData;
  const { monitorId, reportId } = routing.location.query;
  const showId = relPerCheckStore.showId;
  const idCardArr = relPerCheckStore.idCard;
  const personCheckId = itemData.id;
  const showStr = showId.get(personCheckId) ? 'show' : 'hide';
  const idCard = showStr === 'show' && idCardArr.get(personCheckId) ? idCardArr.get(personCheckId) : itemData.idCard;
  const matchStr = match ? 'match' : 'noMatch';
  const cssStr = `${matchStr}_${showStr}`;
  const viewDetail = () => {
    if (match) {
      const str = monitorId ? `?monitorId=${monitorId}&` : `?reportId=${reportId}&`;
      window.open(`/personReport${str}personCheckId=${personCheckId}`);
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
      relPerCheckStore.getIdCard({monitorId, reportId, personCheckId});
    }
  };
  return (
    <div className={match ? styles.wrapperMatch : styles.wrapper} onClick={viewDetail}>
      <div className={match ? styles.labelBlue : styles.labelGray}>
        <div className={match ? styles.labelArrowBlue : styles.labelArrowGrey}></div>
        {match ? '匹配' : '不匹配'}
      </div>
      <div className={styles.line1}>
        <span className={match ? styles.perNameBlue : styles.perNameBlack}>{itemData.name}</span>
        <span className={styles.relation}>{itemData.relationship}</span>
        <span className={match ? styles.idCardBlue : styles.idCardBlack}>{idCard}</span>
        <span className={styles[cssStr]} onClick={showIdCard}></span>
        <span className={styles.checkTime}>核查时间 {itemData.checkDateTime || '无'}</span>
      </div>
      <div className={styles.line2}>
        <KeyValue keys="老赖记录" values={itemData.deadbeat} match={match} />
        <KeyValue keys="被执行人" values={itemData.executed} match={match} />
        <KeyValue keys="失信被执行" values={itemData.dishonesty} match={match} />
        <KeyValue keys="犯罪记录" values={itemData.criminalRecord} match={match} />
      </div>
    </div>
  );
}

CheckItem.propTypes = {
  keys: PropTypes.string,
  itemData: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('routing', 'relPerCheckStore')(observer(CheckItem));
