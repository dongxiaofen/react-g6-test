import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CardTitle({ meta, cData }) {
  if (!meta.title) {
    return null;
  }
  const getMainTitle = () => {
    const mainTitle = meta.title.main;
    const handleClick = meta.title.handleClick;
    let output = '';
    if (handleClick) {
      output = <span onClick={handleClick.bind(null, cData[mainTitle], cData)} className={styles.mainTitleClick}>{cData[mainTitle]}</span>;
    } else {
      output = <span className={styles.mainTitle}>{cData[mainTitle]}</span>;
    }
    return output;
  };
  const getSubTitle = () => {
    if (!meta.title.sub) {
      return null;
    }
    const subTitle = [];
    meta.title.sub.map((title, idx) => {
      if (cData[title] !== 0) {
        subTitle.push(
          <span className={styles.subTitle} key={title + idx}>{cData[title]}</span>
        );
      }
    });
    return subTitle;
  };
  return (
    <div className={styles.box}>
      {getMainTitle()}
      {getSubTitle()}
    </div>
  );
}

CardTitle.propTypes = {
  meta: PropTypes.object.isRequired,
  cData: PropTypes.object.isRequired,
};
export default observer(CardTitle);
