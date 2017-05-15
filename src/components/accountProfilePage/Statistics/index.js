import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import SingeInfo from './SingeInfo';

function Statistics({}) {
  return (
    <div>
      <SingeInfo />
    </div>
  );
}

Statistics.propTypes = {
  foo: PropTypes.string,
};
export default observer(Statistics);
