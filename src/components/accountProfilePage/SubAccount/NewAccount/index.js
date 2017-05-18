import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import NewAccountHeader from './NewAccountHeader';
import NewAccountBody from './NewAccountBody';

function NewAccount({accountProfileStore}) {
  const config = {
    data: accountProfileStore.subAccount10Data,
    isLoading: accountProfileStore.newAccount10IsLoading,
    error: accountProfileStore.subAccount10Data.length === 0,
  };
  return (
    <div className={styles.newAcconut_box}>
      <NewAccountHeader />
      <div className={`${config.isLoading || config.error ? styles.padding_center : styles.newAccountBody_box }`}>
        <NewAccountBody {...config} />
      </div>
    </div>
  );
}

NewAccount.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(NewAccount));
