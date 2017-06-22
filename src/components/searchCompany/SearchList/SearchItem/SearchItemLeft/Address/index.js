import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Address({itemData}) {
  // 地址
  let address = '';
  if (itemData.address) {
    address = (
      <div className={`${styles.address}`}>
        地址：{itemData.address}
      </div>
    );
  }

  return (
    <div className={`${styles.addressWrap}`}>
      {address}
    </div>
  );
}

Address.propTypes = {
  itemData: PropTypes.object,
};

export default observer(Address);
