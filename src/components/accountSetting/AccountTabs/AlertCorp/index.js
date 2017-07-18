import React from 'react';
import { observer, inject } from 'mobx-react';
// import { browserHistory } from 'react-router';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import styles from './index.less';
function AlertCorp({accountSettingStore, routing}) {
  const moduleData = accountSettingStore.tabs.alertCorp;
  const data = moduleData.content;
  const routeToCorp = (name) => {
    routing.push(`/companyHome/corpDetail?companyName=${name}`);
  };
  return (
    <div>
      {
        data.map((item, idx) => {
          return (
            <div key={idx} className={styles.itemBox}>
              <span className={styles.corpName} onClick={routeToCorp.bind(null, item.companyName)}>{item.companyName}</span>
              {item.score && <span className={styles.score}>{`综合分 ${item.score}`}</span>}
              <span className={styles.date}>{`最新预警日期：${item.latestDt}`}</span>
            </div>
          );
        })
      }
      <Pager module="accountAlertCorp" type="small" />
    </div>
  );
}
export default inject('routing')(loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.alertCorp.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.alertCorp.error,
    category: 0,
    errCategory: 1,
    height: 200,
  }),
})(observer(AlertCorp)));
