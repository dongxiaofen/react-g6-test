import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CardTitle({meta, cData}) {
  if (!meta.title) {
    return null;
  }
  const mainTitle = meta.title.main;
  const getSubTitle = () => {
    if (!meta.title.sub) {
      return null;
    }
    const subTitle = [];
    meta.title.sub.map((title, idx) => {
      subTitle.push(
        <span className={styles.subTitle} key={title + idx}>{cData[title]}</span>
      );
    });
    return subTitle;
  };
  return (
    <div className={styles.box}>
      <span className={styles.mainTitle}>{cData[mainTitle]}</span>
      {getSubTitle()}
    </div>
  );
}

CardTitle.propTypes = {
  meta: PropTypes.object.isRequired,
  cData: PropTypes.object.isRequired,
};
export default observer(CardTitle);
