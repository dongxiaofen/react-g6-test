import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Capital({itemData}) {
  // 地址
  let capitalDom = '';
  if (itemData.capital && Number(itemData.capital) > 0) {
    const capital = Number(itemData.capital);
    capitalDom = (
      <div className={`${styles.capital}`}>
        注册资金：{isNaN(capital) ? '--' : capital.toFixed(2)}万元
      </div>
    );
  }

  return (
    <div className={`${styles.capitalWrap}`}>
      {capitalDom}
    </div>
  );
}

Capital.propTypes = {
  itemData: PropTypes.object,
};

export default observer(Capital);
