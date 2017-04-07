import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import moduleName from 'components/lib/button';
import styles from './index.less';

function Modal({
  visible,
  type,
  width,
  title,
  children,
  actionText,
  cancelText,
  action,
  cancel,
  actionLoading,
  cancelLoading,
  closeModal,
  ...props
}) {
  let output = null;
  const _action = () => {
    if (action) {
      action();
    }
  };
  const _closeModal = () => {
    if (closeModal) {
      closeModal();
    }
  };
  const modalBoxClassName = visible
  ? `${styles.modal} ${styles.modalShow}`
  : `${styles.modal}`;
  switch (type) {
    case 'text':
      output = (
        <div className={styles.contentLayer}>
          <div className={styles.closeBtn} onClick={this._closeModal}></div>
          <div className={styles.title}>
            {title}
          </div>
        </div>
      );
      break;
    case 'async':
      output = (
        <div className={styles.contentLayer}>
          <div className="clearfix">
            {children ? children : ''}
          </div>
        </div>
      );
    default:
      break;
  }
  return (
    <div className={modalBoxClassName}>
      {output}
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  width: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  cancelText: PropTypes.string,
  actionText: PropTypes.string,
  action: PropTypes.func,
  cancel: PropTypes.func,
  actionLoading: PropTypes.bool,
  cancelLoading: PropTypes.bool,
};

Modal.defaultProps = {
  width: '440',
  actionText: '确定',
  cancelText: '取消',
  actionLoading: false,
  cancelLoading: false,
};
export default observer(Modal);
