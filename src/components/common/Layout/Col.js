import React, { Component, PropTypes} from 'react';
import styles from './col.less';
export default class Col extends Component {
  static propTypes = {
    offset: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.string,
    bTop: PropTypes.string,
    bBottom: PropTypes.string,
    bLeft: PropTypes.string,
    bRight: PropTypes.string,
    bTopNone: PropTypes.string,
    bBottomNone: PropTypes.string,
    bLeftNone: PropTypes.string,
    bRightNone: PropTypes.string,
  }
  render() {
    let top = '';
    if (this.props.bTop !== '') {
      top = styles.borderTop;
    }
    let bottom = '';
    if (this.props.bBottom !== '') {
      bottom = styles.borderBottom;
    }
    let left = '';
    if (this.props.bLeft !== '') {
      left = styles.borderLeft;
    }
    let right = '';
    if (this.props.bRight !== '') {
      right = styles.borderRight;
    }
    // none
    let topNone = '';
    if (this.props.bTopNone !== '') {
      topNone = styles.borderTopNone;
    }
    let bottomNone = '';
    if (this.props.bBottomNone !== '') {
      bottomNone = styles.borderBottomNone;
    }
    let leftNone = '';
    if (this.props.bLeftNone !== '') {
      leftNone = styles.borderLeftNone;
    }
    let rightNone = '';
    if (this.props.bRightNone !== '') {
      rightNone = styles.borderRightNone;
    }
    return <div className={'col-md-' + this.props.width + ' ' + 'col-md-offset-' + this.props.offset + ' ' + this.props.className + ' ' + top + ' ' + bottom + ' ' + left + ' ' + right + ' ' + topNone + ' ' + bottomNone + ' ' + leftNone + ' ' + rightNone}>{this.props.children}</div>;
  }
}

Col.defaultProps = {
  offset: 0,
  className: '',
  bTop: '',
  bBottom: '',
  bLeft: '',
  bRight: '',
  bTopNone: '',
  bBottomNone: '',
  bLeftNone: '',
  bRightNone: '',
};
