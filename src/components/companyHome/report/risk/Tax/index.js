import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function Tax({}) {
  return (
    <div>
      Tax
    </div>
  );
}

Tax.propTypes = {
  foo: PropTypes.string,
};
export default observer(Tax);
