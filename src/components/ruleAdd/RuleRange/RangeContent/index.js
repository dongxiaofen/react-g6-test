import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RangeContent({}) {
  return (
    <div>

    </div>
  );
}

RangeContent.propTypes = {
  foo: PropTypes.string,
};
export default observer(RangeContent);
