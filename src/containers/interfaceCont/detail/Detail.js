import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import InterfaceInfo from 'components/interface/detail/info';
import MainBody from 'components/interface/detail/mainCont';
// import InterfaceList from 'components/interface/introduce/list';
// import SearchBar from 'components/interface/introduce/searchBar';

@inject('interfaceDetailStore', 'routing')
@observer
export default class Detail extends Component {
  static propTypes = {
    interfaceDetailStore: PropTypes.object,
    routing: PropTypes.object,
  };
  componentDidMount() {
    const id = this.props.routing.location.query.id;
    this.props.interfaceDetailStore.getInfoDetail(id);
    this.props.interfaceDetailStore.getInterfaceType();
    this.props.interfaceDetailStore.getMyInterface();
    this.props.interfaceDetailStore.getErrorDoc();
  }
  componentWillUnmount() {
    this.props.interfaceDetailStore.resetData();
  }
  render() {
    return (
      <div>
        <InterfaceInfo data={{loading: this.props.interfaceDetailStore.interfaceInfo.data === undefined, error: this.props.interfaceDetailStore.interfaceInfo.error}}/>
        <MainBody />
      </div>
    );
  }
}
