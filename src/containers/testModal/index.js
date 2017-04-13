import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/common/Modal';
import DetailModal from 'components/common/DetailModal';

const test = () => console.log('this is test action');
@inject('modalStore', 'detailModalStore') @observer
export default class TestModal extends Component {
  static propTypes = {
    modalStore: PropTypes.object,
    detailModalStore: PropTypes.object,
  }
  openInfoModal = () => {
    const modalStore = this.props.modalStore;
    modalStore.openInfoModal('测试看info modal有没有出来', test, modalStore.closeDefalutAction);
  }
  openCompModal = () => {
    const modalStore = this.props.modalStore;
    modalStore.openCompModal(
      '测试看comp modal有没有出来',
      test,
      test,
      modalStore.closeDefalutAction, (cb) => {
        require.ensure([], (require) => {
          cb(require('./test'));
        });
      }
    );
  }
  openDetailModal = () => {
    const detailModalStore = this.props.detailModalStore;
    detailModalStore.openDetailModal(
      detailModalStore.closeDefalutAction,
      (cb) => {
        require.ensure([], (require) => {
          cb(
            require('./title'),
            require('./content'),
            require('./source')
          );
        });
      }
    );
  }
  render() {
    return (
      <div style={{ height: 1000 }}>
        <button onClick={this.openInfoModal}>info modal</button>
        <button onClick={this.openCompModal}>comp modal</button>
        <button onClick={this.openDetailModal}>detail modal</button>
        <Modal modalStore={this.props.modalStore} />
        <DetailModal modalStore={this.props.detailModalStore} />
      </div>
    );
  }
}
