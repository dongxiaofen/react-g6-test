import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Filter from 'components/interface/introduce/filter';
import InterfaceList from 'components/interface/introduce/list';
import SearchBar from 'components/interface/introduce/searchBar';
import { batchNav } from 'components/hoc';
import styles from './Introduce.less';
@batchNav()
@inject('interfaceStore')
@observer
export default class Introduce extends Component {
  static propTypes = {
    interfaceStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.interfaceStore.getInterfaceList();
    this.props.interfaceStore.getMyInterface();
    this.props.interfaceStore.getInterfaceType();
  }
  componentWillUnmount() {
    this.props.interfaceStore.resetData();
  }
  render() {
    return (
      <div>
        <div className={styles['top-filter']}>
          <div className={styles.filter}>
            <Filter data={{loading: this.props.interfaceStore.isTypeLoading, error: this.props.interfaceStore.interfaceType.error}}/>
          </div>
          <div className={styles.search}>
            <SearchBar />
          </div>
        </div>
        <InterfaceList data={{loading: this.props.interfaceStore.interfaceList.content === undefined, error: this.props.interfaceStore.interfaceList.error}}/>
      </div>
    );
  }
}
