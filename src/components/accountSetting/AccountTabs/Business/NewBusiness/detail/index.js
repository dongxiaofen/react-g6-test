import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Title from './title';
import DetailMain from './main';
import styles from './index.less';
function Detail(props) {
  const date = props.accountSettingStore.tabs.business.activeDate;
  return (
    <div className={styles.detail}>
      <Title date={date} />
      <DetailMain {...props} />
    </div>
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
