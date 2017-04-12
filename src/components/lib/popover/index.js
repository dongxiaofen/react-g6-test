import React, {Component, PropTypes} from 'react';
import styles from './index.less';
export default class Popover extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.node,
    left: PropTypes.string,
    top: PropTypes.string,
    id: PropTypes.string,
    closePopover: PropTypes.func,
    openPopover: PropTypes.func,
  }
  componentDidMount() {
    this.closePopover = () => {
      if (!this.flag) {
        this.props.closePopover();
      } else {
        this.flag = false;
      }
    };
    this.stopClick = ()=> {
      this.props.openPopover();
      if (this.props.visible) {
        this.flag = true;
      }
    };
    document.body.addEventListener('click', this.closePopover);
    document.getElementById(this.props.id).addEventListener('click', this.stopClick);
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.closePopover);
    document.getElementById(this.props.id).removeEventListener('click', this.stopClick);
  }
  render() {
    const popoverCss = this.props.visible ? styles.show : styles.hide;
    return (
      <div id={this.props.id} className={styles.popover}>
        {this.props.children}
        <div className={`${styles.popoverCon} ${popoverCss}`} style={{left: this.props.left, top: this.props.top}}>
          <div className={styles.triangle}></div>
          <div className={`${styles.popoverWrap}`}>
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}
