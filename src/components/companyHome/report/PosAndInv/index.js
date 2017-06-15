import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
// import { ModuleTitle, CardTable } from 'components/common/report';
import PosItem from './PosItem';
import styles from './index.less';

function PosAndInv() {
  return (
    <div className={styles.box}>
      <PosItem />
    </div>
  );
}

PosAndInv.propTypes = {
  foo: PropTypes.string,
};
export default observer(PosAndInv);
