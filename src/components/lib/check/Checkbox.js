import React, { Component, PropTypes } from 'react';
import styles from './check.less';
export default class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.number,
    onChange: PropTypes.func,
    id: PropTypes.string,
    prefix: PropTypes.node,
    magicCheckboxCss: PropTypes.string,
    textCss: PropTypes.string,
    disabled: PropTypes.number,
    title: PropTypes.string,
  }
  static defaultProps = {
    checked: 0,
    disabled: 0,
    title: '',
  }
  test = (evt)=>{
    this.props.onChange(evt);
  }
  render() {
    let checkStatus;
    let disabledStatus;
    const textCss = this.props.textCss ? this.props.textCss : '';
    if (this.props.checked === 1) {
      checkStatus = 'checked';
      // disabledStatus = '';
    }else if (this.props.checked === -1) {
      checkStatus = '';
      // disabledStatus = 'disabled';
    }else {
      checkStatus = '';
      // disabledStatus = '';
    }
    disabledStatus = this.props.disabled === 0 ? '' : 'disabled';
    return (
      <div className={styles.box} title={this.props.title}>
        <input onClick={this.test} className={this.props.magicCheckboxCss || styles.magicCheckbox} type="checkbox" name="layout" data={this.props.id} id={this.props.id} checked={checkStatus} disabled={disabledStatus} />
        <label htmlFor={this.props.id} className={textCss}>{this.props.prefix}{this.props.label}</label>
      </div>
    );
  }
}
