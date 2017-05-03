import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Number({}) {
  return (
    <div>

    </div>
  );
}

Number.propTypes = {
  foo: PropTypes.string,
};
export default observer(Number);
