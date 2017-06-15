import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
// import { ModuleTitle, CardTable } from 'components/common/report';
import styles from './index.less';

function PosItem() {
  return (
    <div className={styles.box}>
      PosItem fdsa
    </div>
  );
}

PosItem.propTypes = {
  foo: PropTypes.string,
};
export default observer(PosItem);
