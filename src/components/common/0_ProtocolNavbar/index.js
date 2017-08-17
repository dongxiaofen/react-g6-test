import React from 'react';
import styles from './index.less';
import { observer, inject } from 'mobx-react';
import getPermissionMeta from 'helpers/getPermissionMeta';

function ProtocolNavbar({clientStore}) {
  return (
    <div className={`clearfix ${styles['header-navbar']}`}>
      <div className={`pull-left ${styles[getPermissionMeta(clientStore.envConfig).logoStyle]}`}></div>
    </div>
  );
}
export default inject('clientStore')(observer(ProtocolNavbar));
