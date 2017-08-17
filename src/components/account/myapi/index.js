import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

// import styles from './index.less';

function MyapiMain() {
  return (
    <div>
      MyapiMain
    </div>
  );
}

MyapiMain.propTypes = {
  accountStore: PropTypes.object,
  clientStore: PropTypes.object,
};
export default observer(MyapiMain);
