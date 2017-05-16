import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import NewAccountHeader from './NewAccountHeader';
import NewAccountBody from './NewAccountBody';

function NewAccount({accountProfileStore}) {
  return (
    <div className={styles.newAcconut_box}>
      <NewAccountHeader />
      <NewAccountBody data={accountProfileStore.subAccount10Data} />
    </div>
  );
}

NewAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(NewAccount));
