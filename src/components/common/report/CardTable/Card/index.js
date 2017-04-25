import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import CardTitle from './CardTitle';
import CardExpand from './CardExpand';
import CardBody from './CardBody';

function Card({meta, cData, serialNum, uiStore}) {
  let isExpanded = '';
  if (uiStore.uiState[meta.dict].show) {
    isExpanded = uiStore.uiState[meta.dict].show.get(serialNum);
  }
  return (
    <div className={styles.card}>
      <CardTitle meta={meta} cData={cData} />
      {
        isExpanded === '' ? '' :
        <CardExpand module={meta.dict} cData={cData} serialNum={serialNum} uiStore={uiStore} isExpanded={isExpanded} />
      }
      <CardBody meta={meta} cData={cData} isExpanded={isExpanded} />
    </div>
  );
}

Card.propTypes = {
  meta: PropTypes.object.isRequired,
  cData: PropTypes.object.isRequired
};
export default inject('uiStore')(observer(Card));
