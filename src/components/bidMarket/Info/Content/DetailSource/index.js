import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function DetailSource({ bidMarketStore }) {
  return (
    <div className={styles.sourceHasUrl}>
      <a href={bidMarketStore.detailTitleData.url} target="_bank">
        <span>查看信息来源</span>
      </a>
    </div>
  );
}

DetailSource.propTypes = {
  bidMarketStore: PropTypes.object,
};
export default inject('bidMarketStore')(observer(DetailSource));
