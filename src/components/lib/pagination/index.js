import React, { Component, PropTypes } from 'react';
import styles from './index.less';
export default class Pagination extends Component {
  static propTypes = {
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      quickJump: props.current,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({
        quickJump: nextProps.current,
      });
    }
  }
  previous() {
    if (this.props.current > 1) {
      this.props.onChange(this.props.current - 1);
      this.setState({
        quickJump: this.props.current - 1,
      });
    }
  }
  next() {
    const totalPage = Math.ceil(this.props.total / this.props.pageSize);
    if (this.props.current < totalPage) {
      this.props.onChange(this.props.current + 1);
      this.setState({
        quickJump: this.props.current + 1,
      });
    }
  }
  quickJump = (evt) => {
    const totalPage = Math.ceil(this.props.total / this.props.pageSize);
    let newPage = Number(evt.target.value.trim());
    if (evt.target.value !== '') {
      if (isNaN(newPage) || newPage < 1) {
        newPage = 1;
      } else if (newPage > totalPage) {
        newPage = totalPage;
      }
    } else {
      newPage = '';
    }
    this.setState({
      quickJump: newPage,
    });
  }
  quickJumpTo = (evt) => {
    const page = this.state.quickJump;
    if (evt.keyCode === 13 && page !== '') {
      this.props.onChange(page);
    }
  }
  resetJump = () => {
    this.setState({
      quickJump: this.props.current,
    });
  }
  render() {
    const totalPage = Math.ceil(this.props.total / this.props.pageSize);
    const prevClass = this.props.current === 1 ? styles.btnDisable : styles.btn;
    const nextClass = this.props.current === totalPage ? styles.btnDisable : styles.btn;
    return (
      <div className={styles.wrapper}>
        <span onClick={this.previous.bind(this)} className={prevClass}>
          <i className="fa fa-angle-left"></i>
        </span>
        <div className={styles.center}>
          <span>{this.props.current}</span>
          <span> / </span>
          <span>{Math.ceil(this.props.total / this.props.pageSize)}</span>
        </div>
        <span onClick={this.next.bind(this)} className={nextClass}>
          <i className="fa fa-angle-right"></i>
        </span>
        <span style={{marginLeft: 10}}>跳至</span>
        <input
          style={{width: this.state.quickJump.toString().length * 10 + 30}}
          onBlur={this.resetJump}
          onChange={this.quickJump}
          onKeyUp={this.quickJumpTo}
          className={styles.quickPage}
          value={this.state.quickJump} />
        <span>页</span>
      </div>
    );
  }
}
Pagination.defaultProps = {
  pageSize: 10,
};
