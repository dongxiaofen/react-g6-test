import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function FormItem({validateStatus = 'init',
                    isInline = true,
                    labelCol = 0.25,
                    wrapperCol = 0.7,
                    cssName = ''}) {
  const statusConfig = {
    init: styles.formItem,
    success: styles.formItem,
    error: styles.hasError
  };
  const validateBool = validateStatus === 'init'
    || validateStatus === 'success';
  const messCss = validateBool ?
    styles.message : `${styles.message} ${styles.isVisible}`;
  return (
    <div className={
      `clearfix
        fs6
        ${statusConfig[validateStatus]} ${cssName}`
    }>
      <label
        style={{width: `${labelCol * 100}%`}}
        className={
          isInline ? styles.inlineLabel : styles.label
            + 'fs6'
        }>
        {this.props.label}
      </label>
      <div
        style={{
          width: `${wrapperCol * 100}%`, position: 'relative'}}
        className={
          isInline ? styles.floatInputWrap : styles.InputWrap}>
        {this.props.children}
        <div className={`fs7 ${messCss}`}>
          <div className={styles.messageContent}>{this.props.help}</div>
          <div className={styles.messageArrow}></div>
        </div>
      </div>
    </div>
  );
}

FormItem.propTypes = {
  foo: PropTypes.string,
};
export default observer(FormItem);
