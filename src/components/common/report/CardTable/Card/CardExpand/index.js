import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CardExpand({serialNum, module, uiStore, isExpanded}) {
  const toggleExpand = () => {
    uiStore.toggleExpand(module, serialNum);
  };
  return (
    <span onClick={toggleExpand} className={styles.expand}>
      <i className={`fa fa-angle-${isExpanded ? 'up' : 'down'}`}></i>
      {
        isExpanded ?
        '收起' : '展开'
      }
    </span>
  );
}

CardExpand.propTypes = {
  module: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  serialNum: PropTypes.number.isRequired
};
export default observer(CardExpand);
