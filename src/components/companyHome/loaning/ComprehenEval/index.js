import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function ComprehenEval({}) {
  return (
    <div>
      多维综合评价分析
    </div>
  );
}

ComprehenEval.propTypes = {
  foo: PropTypes.string,
};
export default observer(ComprehenEval);
