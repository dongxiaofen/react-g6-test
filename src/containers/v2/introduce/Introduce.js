import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Assort from 'components/v2/introduce/assort';
// import InterfaceList from 'components/v1/introduce/list';
import SearchBar from 'components/v2/introduce/searchBar';
import List from 'components/v2/introduce/list';
import { batchNav } from 'components/hoc';
import styles from './Introduce.less';
@batchNav()
@inject('introduceStore')
@observer
export default class Introduce extends Component {
  static propTypes = {
    introduceStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.introduceStore.getAssortment();
    this.props.introduceStore.getAssortmentC2();
  }
  componentWillUnmount() {
    this.props.introduceStore.resetData();
  }
  render() {
    return (
      <div className={styles.introduce}>
        <SearchBar />
        <div className="clearfix">
          <div className={styles.left}>
            <Assort data={{loading: this.props.introduceStore.isAssortmentLoading, error: this.props.introduceStore.assortment.error}}/>
          </div>
          <div className={styles.right}>
            <List />
          </div>
        </div>
      </div>
    );
  }
}
