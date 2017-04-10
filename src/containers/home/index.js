import React, { Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Modal from 'components/common/Modal';

const test = () => console.log(1111);
@inject('modalStore')@observer
export default class Home extends Component {
  static propTypes = {
    modalStore: PropTypes.object,
  }
  openInfoModal = () => {
    const modalStore = this.props.modalStore;
    modalStore.openInfoModal('测试看info modal有没有出来', test, modalStore.closeDefalutAction);
  }
  openCompModal = () => {
    const modalStore = this.props.modalStore;
    modalStore.openCompModal('测试看comp modal有没有出来', test, test, modalStore.closeDefalutAction, (cb) => {
      require.ensure([], (require) => {
        cb(require('./test'));
      });
    });
  }
  render() {
    return (
      <div style={{ height: 1000 }}>
        <button onClick={this.openInfoModal}>info modal</button>
        <button onClick={this.openCompModal}>comp modal</button>
        <Modal modalStore={this.props.modalStore} />
      </div>
    );
  }
}
