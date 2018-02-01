import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

const ApiLi = ({apiListDetailStore}) => {
  const checkeOthers = (idx) => {
    apiListDetailStore.updateValue('activeApiDetail', apiListDetailStore.apiList[idx]);
    apiListDetailStore.getApiDoc();
  };
  return (
    <ul className={styles.apilist}>
      {
        apiListDetailStore.apiList.map((item, idx) => (
          <li
            key={idx}
            onClick={checkeOthers.bind(null, idx)}
            className={item.id === apiListDetailStore.activeApiDetail.id ? styles.active : ''}>{item.name}</li>
        ))
      }
    </ul>
  );
};
ApiLi.propTypes = {
  apiListDetailStore: PropTypes.object,
};
export default inject('apiListDetailStore')(observer(ApiLi));
