import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function MessageContent({}) {
  return (
    <div>

    </div>
  );
}

MessageContent.propTypes = {
  foo: PropTypes.string,
};
export default observer(MessageContent);
