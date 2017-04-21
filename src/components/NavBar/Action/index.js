import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Action({}) {
  return (
    <div>

    </div>
  );
}

Action.propTypes = {
  foo: PropTypes.string,
};
export default observer(Action);
