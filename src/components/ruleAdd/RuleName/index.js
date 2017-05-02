import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function RuleName({}) {
  return (
    <div>
      <div>提示：为了准确将规则运用于你所监控的企业</div>
    </div>
  );
}

RuleName.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleName);
