import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Stock({}) {
  return (
    <div>

    </div>
  );
}

Stock.propTypes = {
  foo: PropTypes.string,
};
export default observer(Stock);
