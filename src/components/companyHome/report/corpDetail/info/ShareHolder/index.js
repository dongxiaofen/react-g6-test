import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function ShareHolder({}) {
  return (
    <div>
      ShareHolder
    </div>
  );
}

ShareHolder.propTypes = {
  foo: PropTypes.string,
};
export default observer(ShareHolder);
