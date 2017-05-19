import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Counter({monitorListStore}) {
  const activeList = monitorListStore.activeList;
  const data = monitorListStore[activeList].monitorCount;
  const returnLoading = (values) => {
    if (data.error) return 0;
    if (data.errorCode) {
      return 0;
    }
    return values === undefined ? <i className="fa fa-spin fa-spinner"></i> : values;
  };
  return (
    <div className={styles.wrapper}>
      主体企业<span>{returnLoading(data.monitorMainCompanyCount)}</span>家,
      关联企业<span>{returnLoading(data.monitorRelatedCompanyCount)}</span>家
    </div>
  );
}
export default observer(Counter);
