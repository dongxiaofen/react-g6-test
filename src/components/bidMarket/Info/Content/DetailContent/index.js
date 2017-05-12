import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function DetailContent({ bidMarketStore }) {
  return (
    <div className={styles.content}>
      <div dangerouslySetInnerHTML={{ __html: bidMarketStore.detailContent }}></div>
    </div>
  );
}

DetailContent.propTypes = {
  bidMarketStore: PropTypes.object,
};
export default inject('bidMarketStore')(observer(DetailContent));
