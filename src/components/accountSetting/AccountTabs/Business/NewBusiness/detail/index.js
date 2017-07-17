import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
function Detail({accountSettingStore}) {
  const data = accountSettingStore.tabs.business.dailyDetail.content;
  console.log(data, 'data');
  return (
    <div className={styles.detail}>dailyDetail</div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.business.dailyDetail.content === undefined ? true : false,
    error: props.accountSettingStore.tabs.business.dailyDetail.error,
    height: 500,
    errCategory: 1,
    category: 0,
  }),
})(observer(Detail));
