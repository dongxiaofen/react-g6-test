import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function Foreign({}) {
  return (
    <div>
      Foreign
    </div>
  );
}

Foreign.propTypes = {
  foo: PropTypes.string,
};
export default observer(Foreign);
