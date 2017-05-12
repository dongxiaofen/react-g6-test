import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Source({url, source}) {
  if (source) {
    return (
      <div className={styles.sourceHasUrl}>
        <a href={url} target="_bank">
          <span>信息来源：</span>
          {source}
        </a>
      </div>
    );
  }
  return (
    <div className={styles.sourceHasUrl}>
      <a href={url} target="_bank">
        <span>查看信息来源</span>
      </a>
    </div>
  );
}

Source.propTypes = {
  foo: PropTypes.string,
};
export default observer(Source);
