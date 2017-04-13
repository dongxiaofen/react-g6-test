import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

const confirmAction = () => console.log('this is test confirmAction');
const cancelAction = () => console.log('this is test cancelAction');
@inject('modalStore', 'detailModalStore') @observer
export default class TestModal extends Component {
  static propTypes = {
    modalStore: PropTypes.object,
    detailModalStore: PropTypes.object,
  }
  // comp modal
  openCompModal = () => {
    const modalStore = this.props.modalStore;
    const args = {
      title: '测试看comp modal有没有出来',
      confirmAction: confirmAction,
      cancelAction: cancelAction,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./test'));
        });
      }
    };
    modalStore.openCompModal({ ...args });
  }
  // detail modal
  openDetailModal = () => {
    const detailModalStore = this.props.detailModalStore;
    detailModalStore.openDetailModal(
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
        <button onClick={this.openCompModal}>comp modal</button>
        <button onClick={this.openDetailModal}>detail modal</button>
      </div>
    );
  }
}
