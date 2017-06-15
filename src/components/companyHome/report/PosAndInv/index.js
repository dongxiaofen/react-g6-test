import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import { ModuleTitle, CardTable } from 'components/common/report';
import { ModuleTitle } from 'components/common/report';
import PosItem from './PosItem';
import styles from './index.less';

function PosAndInv({investmentStore}) {
  const output = [];
  const manageData = investmentStore.manageData;
  const count = manageData.length ? manageData.length : 0;
  if (manageData.length > 0 ) {
    manageData.forEach((item, idx) => {
      output.push(
        <PosItem posItemData={item} posItemIndex={idx} key={`${idx}PosAndInvMain`}/>
      );
    });
  }

  return (
    <div className={styles.box}>
      <ModuleTitle module="董监高对外投资任职" count={count} />
      {output}
    </div>
  );
}

PosAndInv.propTypes = {
  investmentStore: PropTypes.object,
};
export default inject('investmentStore')(observer(PosAndInv));
