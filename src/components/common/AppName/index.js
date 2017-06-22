import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import getPermissionMeta from 'helpers/getPermissionMeta';

function AppName({clientStore}) {
  return (
    <span>{getPermissionMeta(clientStore.envConfig).title}</span>
  );
}

AppName.propTypes = {
  clientStore: PropTypes.object,
};
export default inject('clientStore')(observer(AppName));
