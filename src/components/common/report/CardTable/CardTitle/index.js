import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CardTitle({mainTitle, subTitle1, subTitle2}) {
  return (
    <div>
      <span className={styles.mainTitle}>{mainTitle}</span>
      {
        subTitle1 ?
        <span className={styles.subTitle1}>{subTitle1}</span> : ''
      }
      {
        subTitle2 ?
        <span className={styles.subTitle2}>{subTitle2}</span> : ''
      }
    </div>
  );
}

CardTitle.propTypes = {
  foo: PropTypes.string,
};
export default observer(CardTitle);
