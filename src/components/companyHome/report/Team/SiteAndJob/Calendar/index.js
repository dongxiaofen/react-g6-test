import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function Calendar({}) {
  return (
    <div>
      this is Calendar
    </div>
  );
}

Calendar.propTypes = {
  foo: PropTypes.string,
};
export default observer(Calendar);
