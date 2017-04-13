import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function Court({}) {
  return (
    <div>
      Court
    </div>
  );
}

Court.propTypes = {
  foo: PropTypes.string,
};
export default observer(Court);
