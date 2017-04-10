import React, { Component, PropTypes } from 'react';
import styles from './check.less';
export default class Radio extends Component {
  static propTypes = {
    label: PropTypes.string,
    labelCss: PropTypes.string,
    checked: PropTypes.number,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    checked: 0,
    labelCss: ''
  }
  render() {
    let checkStatus;
    let disabledStatus;
    if (this.props.checked === 1) {
      checkStatus = 'checked';
      disabledStatus = '';
    }else if (this.props.checked === -1) {
      checkStatus = '';
      disabledStatus = 'disabled';
    }else {
      checkStatus = '';
      disabledStatus = '';
    }
    return (
      <div className={styles.box}>
        <input onClick={this.props.onChange} className={styles.magicRadio} type="radio" name="layout" id={this.props.label} checked={checkStatus} disabled={disabledStatus} />
        <label className={this.props.labelCss} htmlFor={this.props.label}>{this.props.label}</label>
      </div>
    );
  }
}
