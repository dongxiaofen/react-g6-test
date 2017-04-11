import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Industry({ industryNames }) {
  if (industryNames.length === 0) {
    return null;
  }
  return (
    <div className={styles.industryStyle}>
      <span>行业：</span>
      <span>{industryNames.join('、')}</span>
    </div>
  );
}

Industry.propTypes = {
  foo: PropTypes.string,
};
export default observer(Industry);
