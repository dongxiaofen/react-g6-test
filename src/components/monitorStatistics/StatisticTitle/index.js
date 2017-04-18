import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function StatisticTitle({ title, subTitle }) {
  return (
    <div className={styles.statisticTitle}>
      {title}
      {
        subTitle
        ? <span className={styles.statisticSubTitle}>{ subTitle }</span>
        : null
      }
    </div>
  );
}

StatisticTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};
export default observer(StatisticTitle);
