import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {ModuleTitle} from 'components/common/report';
// import styles from './index.less';

function ShareHolder({}) {
  return (
    <div>
      <ModuleTitle module="股东信息" />
    </div>
  );
}

ShareHolder.propTypes = {
  foo: PropTypes.string,
};
export default observer(ShareHolder);
