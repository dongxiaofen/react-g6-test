import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import Assort from 'components/v2/introduce/assort';
import { batchNav } from 'components/hoc';
// import styles from './Introduce.less';
@batchNav()
@inject('introduceStore')
@observer
export default class ApiListDetail extends Component {
  static propTypes = {
    introduceStore: PropTypes.object,
  };
  componentDidMount() {
    // this.props.introduceStore.getAssortment();
    // this.props.introduceStore.getAssortmentC2();
  }
  componentWillUnmount() {
    // this.props.introduceStore.resetData();
  }
  render() {
    // console.log(this.props.introduceStore.filterInfo.name, 'name');
    return (
      <div>
        ApiListDetail
      </div>
    );
  }
}
