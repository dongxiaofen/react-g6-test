import React, { Component, PropTypes } from 'react';
import styles from './index.less';
export default class Select extends Component {
  static propTypes = {
    width: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    children: PropTypes.node,
  };
  static defaultProps = {
    value: '',
    width: '206px'
  }
  constructor(props) {
    super(props);
    this.state = {
      isExtend: false,
      value: props.defaultValue || props.value,
      valueConfig: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  optionOnChangeHandel(value, labelValue) {
    this.setState({
      value: value,
      isExtend: false,
    });
    if (this.props.onChange) {
      this.props.onChange(value, labelValue);
    }
  }
  toggleSelect = () => {
    this.setState({
      isExtend: !this.state.isExtend,
    });
  }
  blurHandle = () => {
    this.setState({
      isExtend: false,
    });
  }
  createItem = () => {
    const output = [];
    const children = this.props.children;
    if (children.length > 0) {
      this.props.children.forEach((child, idx) => {
        output.push(
          React.cloneElement(child, {
            initValueConfig: this.initValueConfig.bind(this),
            key: `option${idx}`,
            changeAct: this.optionOnChangeHandel.bind(this),
            selectValue: this.state.value,
          })
        );
      });
      return output;
    }
    return React.cloneElement(children, {
      initValueConfig: this.initValueConfig.bind(this),
      changeAct: this.optionOnChangeHandel.bind(this),
      selectValue: this.state.value,
    });
  }
  initValueConfig = (value, labelValue) => {
    const valueConfig = this.state.valueConfig;
    valueConfig[value] = labelValue;
    this.setState({
      valueConfig: valueConfig,
    });
  }
  render() {
    const cssName = this.state.isExtend ? `${styles.select} ${styles.selectExtend}` : styles.select;
    return (
      <div className={cssName} style={{ width: this.props.width }}>
        <div
          className={styles.selectInput}
          tabIndex="0"
          onMouseDown={this.toggleSelect}
          onBlur={this.blurHandle}>
          <span>
            {this.state.valueConfig[this.state.value]}
          </span>
          <i className="fa fa-angle-down"></i>
        </div>
        <ul className={styles.selectMenu}>
          {this.createItem()}
        </ul>
      </div>
    );
  }
}
export class Option extends Component {
  static propTypes = {
    children: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    changeAct: PropTypes.func,
    initValueConfig: PropTypes.func,
    selectValue: PropTypes.node,
  }
  componentDidMount() {
    this.props.initValueConfig(this.props.value, this.props.children);
  }
  changeAct = () => {
    this.props.changeAct(this.props.value, this.props.children);
  }
  render() {
    let output;
    if (this.props.selectValue === this.props.value) {
      output = <li className={styles.selectMenuActive} onMouseDown={this.changeAct}>{this.props.children}</li>;
    } else {
      output = <li onMouseDown={this.changeAct}>{this.props.children}</li>;
    }
    return output;
  }
}
Select.Option = Option;
