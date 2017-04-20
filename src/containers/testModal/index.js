import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';

const confirmAction = () => console.log('this is test confirmAction');
const cancelAction = () => console.log('this is test cancelAction');

@loadingComp({
  mapDataToProps: () => ({
    loading: false,
    category: 0,
    error: false,
    errCategory: 1
  })
})
@inject('modalStore', 'detailModalStore', 'messageStore')
@observer
export default class TestModal extends Component {
  static propTypes = {
    modalStore: PropTypes.object,
    detailModalStore: PropTypes.object,
    messageStore: PropTypes.object,
  }
  // comp modal
  openCompModal = () => {
    const modalStore = this.props.modalStore;
    const args = {
      title: '测试看comp modal有没有出来',
      confirmAction: confirmAction,
      cancelAction: cancelAction,
      isSingleBtn: true,
      confirmLoading: true,
      pointText: '惺惺惜惺惺',
      pactUrl: 'xxxxxx',
      pactName: '惺惺惜惺惺',
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
  // message
  openInfoMessage = () => {
    const obj = {
      content: 'this is info message'
    };
    const messageStore = this.props.messageStore;
    messageStore.openMessage({ ...obj });
  }
  openWarningMessage = () => {
    const messageStore = this.props.messageStore;
    const obj = {
      type: 'warning',
      content: 'this is warning message',
      duration: 3000
    };
    messageStore.openMessage({ ...obj });
  }
  render() {
    return (
      <div style={{ height: 1000, marginTop: 100 }}>
        <button onClick={this.openCompModal}>comp modal</button>
        <button onClick={this.openDetailModal}>detail modal</button>
        <button onClick={this.openInfoMessage}>info message</button>
        <button onClick={this.openWarningMessage}>warning message</button>
      </div>
    );
  }
}
