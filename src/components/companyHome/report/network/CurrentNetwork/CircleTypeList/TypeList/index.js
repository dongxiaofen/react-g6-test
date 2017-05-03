import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function TypeList({}) {
  return (
    <div>
      TypeList
    </div>
  );
}

TypeList.propTypes = {
  foo: PropTypes.string,
};
export default observer(TypeList);
