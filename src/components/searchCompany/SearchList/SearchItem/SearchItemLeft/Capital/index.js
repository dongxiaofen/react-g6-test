import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Capital({itemData}) {
  // 地址
  let capital = '';
  if (itemData.capital) {
    capital = (
      <div className={`${styles.capital}`}>
        注册资金：{itemData.capital}
      </div>
    );
  }

  return (
    <div className={`${styles.capitalWrap}`}>
      {capital}
    </div>
  );
}

Capital.propTypes = {
  itemData: PropTypes.object,
};

export default observer(Capital);
