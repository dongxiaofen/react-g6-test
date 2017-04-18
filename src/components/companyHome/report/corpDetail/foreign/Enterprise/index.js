import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function Enterprise({}) {
  return (
    <div>
      Enterprise
    </div>
  );
}

Enterprise.propTypes = {
  foo: PropTypes.string,
};
export default observer(Enterprise);
