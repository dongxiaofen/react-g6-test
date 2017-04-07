import React, { Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
// import SearchBar from 'components/home/SearchBar';
// import SearchList from 'components/home/SearchList';
import Modal from 'components/common/Modal';

@inject('modalStore')@observer
export default class Home extends Component {
  static propTypes = {
    modalStore: PropTypes.object,
  }
  openModal = () => {
    const modalStore = this.props.modalStore;
    modalStore.openTextModal('测试看modal有没有出来', '测试成功', modalStore.closeModal);
  }
  render() {
    console.log(this.props.modalStore);
    return (
      <div>
        <button onClick={this.openModal}>点我打开modal</button>
        <Modal />
      </div>
    );
  }
}
