import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
function TableList({alertAnalysisStore}) {
  const data = alertAnalysisStore.listData.content;
  const createTable = () => {
    return data.map(item => {
      return (
        <div key={item.id} className={styles.itemBox}>
          <div className={styles.lineRow}>
            <span className={styles.name}>
              {item.ruleName}
            </span>
            <span className={styles.type}>
              {item.alertType}
            </span>
            <span
              className={styles.viewBtn}
              >
              详情
            </span>
          </div>
          <div>
            <span className={styles.desc}>预警依据：{item.description}</span>
            <span className={styles.time}>预警日期：{item.ruleTime}</span>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      {createTable()}
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.alertAnalysisStore.listData.content === undefined ? true : false,
    error: props.alertAnalysisStore.listData.error,
    category: 0,
    height: 200,
  }),
})(observer(TableList));
