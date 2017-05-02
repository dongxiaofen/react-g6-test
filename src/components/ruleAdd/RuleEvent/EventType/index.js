import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function EventType({}) {
  return (
    <div>

    </div>
  );
}

EventType.propTypes = {
  foo: PropTypes.string,
};
export default observer(EventType);
