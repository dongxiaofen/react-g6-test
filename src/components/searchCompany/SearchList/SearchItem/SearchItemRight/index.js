import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SearchItemRight({itemData}) {
  return (
    <div className={`${styles.itemRightWrap}`}>
      {itemData.address}
    </div>
  );
}

SearchItemRight.propTypes = {
  itemData: PropTypes.object,
};
export default observer(SearchItemRight);
