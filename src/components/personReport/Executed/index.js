import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Executed({}) {
  return (
    <div>
      <ModuleTitle module="主要人员" count={personList.length} />
      <CommonTable {...data} />
    </div>
  );
}

Executed.propTypes = {
  foo: PropTypes.string,
};
export default observer(Executed);
