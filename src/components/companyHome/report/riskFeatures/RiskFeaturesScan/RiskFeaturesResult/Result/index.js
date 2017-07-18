import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import List from '../List';

function Result({data}) {
  const result = data.result && data.result.targetNum && data.result.targetNum > 0 ? false : true;
  return (
    <div className={styles.box}>
      <div className={`${styles.wrap} ${result ? styles.wrapY : styles.wrapN} clearfix`}>
        <div className={`${styles.left} ${result ? styles.leftY : styles.leftN}`}></div>
        <div className={styles.center}>
          <div className={styles.title}>
            扫描完成，该企业命中风险特征
          </div>
          <div className={`${styles.content} clearfix`}>
            <div className={styles.content1}>扫描项目：事件行为<span>{data.result && data.result.basicInfo && data.result.basicInfo.keyCompEventNum ? data.result.basicInfo.keyCompEventNum : 0}</span>条</div>
            <div className={styles.content2}>扫描结果：命中风险特征<span>{data.result && data.result.targetNum ? data.result.targetNum : 0}</span>个</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.time}>
            扫描时间：{data.result && data.result.date ? data.result.date : '暂无'}
          </div>
          <div className={`${styles.button} ${result ? styles.buttonY : styles.buttonN} ${data.result && data.result.canScan ? '' : styles.buttonNone}`}>
            重新扫描
          </div>
        </div>
      </div>
      {result ? '' : <List data={data} />}
    </div>
  );
}

Result.propTypes = {
  data: PropTypes.object,
};
export default observer(Result);
