import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function OverView({}) {
  return (
    <div>
      概述52
    </div>
  );
}

OverView.propTypes = {
  foo: PropTypes.string,
};
export default observer(OverView);
