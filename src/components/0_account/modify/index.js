import React from 'react';
import {observer} from 'mobx-react';
import Info from './info';
import Form from './form';
// import styles from './index.less';

function ModifyMain() {
  return (
    <div>
      <Info />
      <Form />
    </div>
  );
}

export default observer(ModifyMain);
