import React from 'react';
import { observer } from 'mobx-react';
// import { loadingComp } from 'components/hoc';
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

export default observer(Detail);
