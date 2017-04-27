import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function BidMarketContent({assetsStore}) {
  return (
    <div className={styles['bidMarket-content']}>
      <div dangerouslySetInnerHTML={{__html: assetsStore.bidMarkertContent}}></div>
    </div>
  );
}

BidMarketContent.propTypes = {
  assetsStore: PropTypes.object,
};
export default inject('assetsStore')(observer(BidMarketContent));
