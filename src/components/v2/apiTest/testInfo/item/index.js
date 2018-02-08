import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function InfoItem({cssName, title, required}) {
  return (
    <div className={`${cssName ? cssName : ''} ${styles['info-item']}`}>
      {required ? <span className={styles.required}>*</span> : null}
      <span className={styles['info-title']}>{title}</span>
      {this.props.children}
    </div>
  );
}

InfoItem.propTypes = {
  children: PropTypes.object,
  cssName: PropTypes.string,
  title: PropTypes.string,
};
export default observer(InfoItem);