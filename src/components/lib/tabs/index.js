import React, { Component, PropTypes } from 'react';
import TabPane from './TabPane';
import Tooltip from 'antd/lib/tooltip';
import styles from './index.less';
class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node,
    defaultActiveKey: PropTypes.number,
    className: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      tabActive: props.defaultActiveKey,
    };
  }
  componentWillMount() {
    if (this.props.defaultActiveKey) {
      return;
    }
    this.checkPropsValid(this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.checkPropsValid(nextProps);
  }
  checkPropsValid(props) {
    const children = props.children;
    const validChildIdx = React.Children.map(children, (child, idx) => {
      if (!child.props.none && !child.props.disabled) {
        return idx + 1;
      }
    });
    if (validChildIdx.length > 0) {
      this.setState({
        tabActive: validChildIdx[0],
      });
    } else {
      throw new Error('tabs must have at least one Tab without none and disabled');
    }
  }
  changeBar(barIdx, disabled) {
    if (disabled) return;
    this.setState({
      tabActive: barIdx + 1,
    });
  }
  createTabBar() {
    const children = this.props.children;
    const output = [];
    const tabActive = this.state.tabActive;
    let barCss;
    let tab;
    let disabled;
    const className = this.props.className;
    React.Children.forEach(children, (child, barIdx) => {
      tab = child.props.tab;
      disabled = child.props.disabled;
      barCss = barIdx + 1 === tabActive ? styles.tabBarAct : styles.tabBar;
      barCss = disabled ? styles.tabBarDis : barCss;
      barCss = className ? barCss + ` ${className}` : barCss;
      if (!child.props.none) {
        output.push(
          <Tooltip key={Math.random()} title={disabled ? child.props.title : ''}>
            <div
              className={barCss}
              onClick={this.changeBar.bind(this, barIdx, disabled)}
              >
              {tab}
            </div>
          </Tooltip>
        );
      }
    });
    return output;
  }
  createTabCon() {
    const output = [];
    const tabActive = this.state.tabActive;
    const children = this.props.children;
    let className;
    let conCss;
    let disabled;
    let noReMount;
    let reMount;
    React.Children.forEach(children, (child, conIdx) => {
      className = child.props.className;
      conCss = conIdx + 1 === tabActive ? styles.tabConAct : styles.tabCon;
      conCss = className ? conCss + ` ${className}` : conCss;
      disabled = child.props.disabled;
      reMount = child.props.reMountEveryTime && conIdx + 1 === tabActive && !child.props.none && !disabled;
      noReMount = !child.props.none && !disabled && !child.props.reMountEveryTime;
      if (reMount || noReMount) {
        output.push(
          <div key={Math.random()} className={conCss}>
            {child.props.children}
          </div>
        );
      }
    });
    return output;
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.tabBarBox}>
          {this.createTabBar()}
        </div>
        <div className={styles.tabConBox}>
          {this.createTabCon()}
        </div>
      </div>
    );
  }
}
Tabs.TabPane = TabPane;
export default Tabs;
