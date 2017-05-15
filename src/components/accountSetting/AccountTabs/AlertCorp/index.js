import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
function AlertCorp({accountSettingStore}) {
  const moduleData = accountSettingStore.tabs.alertCorp;
  const data = moduleData.content;
  return (
    <div>
      {
        data.map((item, idx) => {
          return (
            <div key={idx} className={styles.itemBox}>
              <span className={styles.corpName}>么么么么有限公司</span>
              <span className={styles.score}>综合分 98</span>
              <span className={styles.date}>最新预警日期：2012-01-01</span>
            </div>
          );
        })
      }
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.alertCorp.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.alertCorp.error,
    category: 0,
    errCategory: 1,
    height: 200,
  }),
})(observer(AlertCorp));
