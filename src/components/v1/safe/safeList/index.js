import React from 'react';
import {observer, inject} from 'mobx-react';
// import { loadingComp } from 'components/hoc';
import List from './list';

import styles from './index.less';

function SafeList({accountStore}) {
  const listData = {
    loading: accountStore.safe.resetList.result.data === undefined,
    error: accountStore.safe.resetList.result.error
  };
  return (
    <div className={styles.safeList}>
      <h3 className={styles.title}>密钥重置记录</h3>
      <List data={listData} />
    </div>
  );
}

// export default loadingComp({
//   mapDataToProps: props => ({
//     loading: props.data.loading,
//     error: props.data.error,
//     imgCategory: 13,
//     category: 0,
//     errCategory: 2,
//     height: 500
//   }),
// })(observer(SafeList));
export default inject('accountStore')(observer(SafeList));
