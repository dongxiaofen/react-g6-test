import React from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';
function Content({content}) {
  return (
    <div className={styles.wrap}>
      <div dangerouslySetInnerHTML={{__html: content}} />
   </div>
  );
}
export default observer(Content);
