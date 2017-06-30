import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import PosAndInvList from './PosAndInvList';
import styles from './index.less';

function PosAndInv({investmentStore}) {
  const manageData = investmentStore.manageData;
  const count = manageData.length ? manageData.length : 0;

  const isLoading = this.props.investmentStore.manageData === undefined ? true : false;
  const error = this.props.investmentStore.manageData.error;
  return (
    <div className={styles.box}>
      <ModuleTitle module="董监高投资任职" count={count} />
      <PosAndInvList isLoading={isLoading} error={error} module="董监高对外投资" />
    </div>
  );
}

PosAndInv.propTypes = {
  investmentStore: PropTypes.object,
};

export default inject('investmentStore')(observer(PosAndInv));
