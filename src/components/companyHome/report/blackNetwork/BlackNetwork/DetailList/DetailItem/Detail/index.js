import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Detail({data, showDetail, index, modalFocusIdx}) {
  return (
    <div className={styles.detailBox}>
      <span className={modalFocusIdx === index ? styles.dotFocus : styles.dot}></span>
      <a onClick={showDetail.bind(this, index, data)} className={modalFocusIdx === index ? styles.detailFocus : styles.detail}>
        {data.regDate} 发现: {data.type}
      </a>
    </div>
  );
}

Detail.propTypes = {
  foo: PropTypes.string,
};
export default observer(Detail);
