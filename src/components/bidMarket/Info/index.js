import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Info({}) {
  return (
    <div>

    </div>
  );
}

Info.propTypes = {
  foo: PropTypes.string,
};
export default observer(Info);
