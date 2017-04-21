import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function BaseInfo({}) {
  return (
    <div>

    </div>
  );
}

BaseInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(BaseInfo);
