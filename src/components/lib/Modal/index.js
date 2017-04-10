import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Button from 'components/lib/button';
import styles from './index.less';

function Modal({
  visible,
  type,
  iconType,
  width,
  title,
  children,
  confirmText,
  cancelText,
  confirmAction,
  cancelAction,
  confirmLoading,
  cancelLoading,
  closeAction,
  ...props
}) {
  let output = null;
  const iconCssClass = styles[`${iconType}Icon`];
  const _confirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
  };
  const _cancelAction = () => {
    if (cancelAction) {
      cancelAction();
    }
  };
  const _closeAction = () => {
    if (closeAction) {
      closeAction();
    }
  };
  const modalBoxClassName = visible
    ? `${styles.modal} ${styles.modalVisible}`
    : `${styles.modal}`;
  const contentBoxClassName = visible
    ? `${styles.contentLayer} ${styles.visible}`
    : `${styles.contentLayer}`;
  switch (type) {
    case 'text':
      output = (
        <div>
          <div className={styles.closeBtn} onClick={_closeAction}></div>
          <div className={styles.iconBox}>
            <div className={iconCssClass}></div>
          </div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.buttonBox}>
            <Button className={styles.button} loading={confirmLoading} onClick={_confirmAction}>
              {confirmText}
            </Button>
          </div>
        </div>
      );
      break;
    case 'async':
      output = (
        <div>
          <div className={styles.closeBtn} onClick={_closeAction}></div>
          <div className={styles.title}>
            {title}
          </div>
          <div className="clearfix" {...props}>
            {children ? children : ''}
          </div>
          <div className={styles.buttonBox}>
            <Button className={styles.cancelBtn} loading={cancelLoading} onClick={_cancelAction}>
              {cancelText}
            </Button>
            <Button className={styles.confirmButton} btnType="primary" loading={confirmLoading} onClick={_confirmAction}>
              {confirmText}
            </Button>
          </div>
        </div>
      );
      break;
    default:
      return null;
  }
  return (
    <div className={modalBoxClassName}>
      <div className={contentBoxClassName} style={{ width: width }}>
        {output}
      </div>
    </div>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  iconType: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  cancelAction: PropTypes.func,
  confirmAction: PropTypes.func,
  cancelLoading: PropTypes.bool,
  confirmLoading: PropTypes.bool,
};

Modal.defaultProps = {
  width: '440px',
  type: 'text',
  iconType: 'info',
  cancelText: '取消',
  confirmText: '确定',
  confirmLoading: false,
  cancelLoading: false,
};
export default observer(Modal);
