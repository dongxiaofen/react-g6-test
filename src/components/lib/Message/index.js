import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Message({ visible, type, contant }) {
  const messageClass = visible ? `${styles.message} ${styles.visible}` : `${styles.message}`;
  const messageBoxClass = type ? 
  return (
    <div className={messageClass}>
      <div className={styles.messageBox}>
        {contant}
      </div>
    </div>
  );
}

Message.propTypes = {
  visible: PropTypes.bool,
  type: PropTypes.string,
  contant: PropTypes.string,
};
export default observer(Message);
