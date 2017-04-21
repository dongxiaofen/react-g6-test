import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FrName({itemData}) {
  // 法人
  let frName = '';
  if (itemData.frName) {
    frName = (
      <div className={`${styles.frName}`}>
        法人：{itemData.frName}
      </div>
    );
  }
  return (
    <div className={`${styles.frNameWrap}`}>
      {frName}
    </div>
  );
}

FrName.propTypes = {
  itemData: PropTypes.object,
};
export default observer(FrName);
