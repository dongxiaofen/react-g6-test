import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Chart from './Chart';

function Area({ bidMarketStore }) {
  const params = bidMarketStore.params;
  const province = params.province;
  const city = params.city;
  let title = '全国地域分布';
  if (province) {
    if (city) {
      title = (
        <span>
          <span
            className={`${styles['bid-market-cp']} ${styles['bidMarket-map-select-title']} ${styles['text-underline']}`}
            onClick={this.titleOnClick.bind(this, '')}>
            全国
          </span>
          <span className={styles['bidMarket-map-select-title']}>></span>
          <span
            className={`${styles['bid-market-cp']} ${styles['bidMarket-map-select-title']} ${styles['text-underline']}`}
            onClick={this.titleOnClick.bind(this, province)}>
            {province}
          </span>
          <span className={styles['bidMarket-map-select-title']}>></span>
          <span>{city}地域分布</span>
        </span>
      );
    } else {
      title = (
        <span>
          <span
            className={`${styles['bid-market-cp']} ${styles['bidMarket-map-select-title']} ${styles['text-underline']}`}
            onClick={this.titleOnClick.bind(this, '')}>
            全国
          </span>
          <span className={styles['bidMarket-map-select-title']}>></span>
          <span>{province}地域分布</span>
        </span>
      );
    }
  }
  return (
    <div className={styles.wrap}>
      <h4 className={styles['bidMarket-black-title']}>
        {title}
      </h4>
      <Chart />
    </div>
  );
}

Area.propTypes = {
  bidMarketStore: PropTypes.object,
};
export default inject('bidMarketStore')(observer(Area));
