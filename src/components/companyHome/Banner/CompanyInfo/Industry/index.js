import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Industry({ industryNames }) {
  if (!industryNames || industryNames.length === 0) {
    return null;
  }
  return (
    <div className={styles.industryStyle}>
      <span>行业：{industryNames.join(' / ')}</span>
    </div>
  );
}

Industry.propTypes = {
  industryNames: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default observer(Industry);
