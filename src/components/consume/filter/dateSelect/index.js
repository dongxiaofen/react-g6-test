import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
// import styles from './index.less';

function DateSelect({consumeStore}) {
  return (
    <div></div>
  );
}

DateSelect.propTypes = {
  consumeStore: PropTypes.object,
};
export default inject('consumeStore')(observer(DateSelect));
