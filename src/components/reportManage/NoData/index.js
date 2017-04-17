import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function NoData({}) {
  return (
    <div className={styles.noDataSetIng}>
      <div className={styles.imageBox}></div>
      <div className={styles.tips}>未生成企业报告，“查询”企业后进行创建</div>
    </div>
  );
}

NoData.propTypes = {
  foo: PropTypes.string,
};
export default observer(NoData);
