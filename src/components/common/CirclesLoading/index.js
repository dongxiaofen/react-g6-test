import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CirclesLoading({height = '400px'}) {
  return (
    <div className={styles.loaderTable} style={{ height: height }}>
      <div className={styles.loaderTableCell}>
        <section className={styles.loader}>
          <span className={`${styles.loader} ${styles.loaderCircles}`}></span>
        </section>
      </div>
    </div>
  );
}

CirclesLoading.propTypes = {
  foo: PropTypes.string,
};

export default observer(CirclesLoading);
