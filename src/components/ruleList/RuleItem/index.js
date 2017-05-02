import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RuleItem({}) {
  return (
    <div>

    </div>
  );
}

RuleItem.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleItem);
