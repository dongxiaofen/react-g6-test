import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

@observer
export default class Processer extends Component {
  static propTypes = {
    process: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    processFunc: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.timeInterval = null;
  }
  componentDidMount() {
    this.timeInterval = setInterval(() => {
      this.props.processFunc();
      if (Number(this.props.process) === 90) {
        clearInterval(this.timeInterval);
      }
    }, 300);
  }
  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
  render() {
    const process = Number(this.props.process);
    if (process === 100) {
      return null;
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.process} style={{width: process + '%'}}></div>
      </div>
    );
  }
}
