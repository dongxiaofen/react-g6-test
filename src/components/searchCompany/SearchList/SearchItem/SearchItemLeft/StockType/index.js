import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function StockType({itemData}) {
  // 股票上市相关
  let stock = '';
  if (itemData.stock) {
    const stockData = itemData.stock;
    if (stockData.stockMarket) {
      stock = (
        <div className={`${styles.labelStyle}`}>
          {stockData.stockMarket}
        </div>
      );
    }
  }
  return (
    <div className={`${styles.stockStatus}`}>
      {stock}
    </div>
  );
}

StockType.propTypes = {
  itemData: PropTypes.object,
};
export default observer(StockType);
