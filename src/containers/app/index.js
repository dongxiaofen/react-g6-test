import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
import Login from 'components/Login';
import NavBar from 'components/NavBar';
// import MyAlert from 'components/common/MyAlert';
import Modal from 'components/common/Modal';
import DetailModal from 'components/common/DetailModal';
import Message from 'components/common/Message';
import PayModal from 'components/common/PayModal';

@inject('modalStore', 'detailModalStore', 'messageStore', 'payModalStore')
@observer
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
    modalStore: PropTypes.object,
    detailModalStore: PropTypes.object,
    messageStore: PropTypes.object,
    payModalStore: PropTypes.object,
  };
  render() {
    const pathname = this.props.location.pathname;
    if (pathname === '/' || pathname === '/pdfDown' || pathname === '/solution' || pathname === '/about') {
      return (
        <div className={styles.container}>
          {
            pathname === '/pdfDown' ? '' :
              <Login pathname={pathname} />
          }
          {this.props.children}
        </div>
      );
    }
    return (
      <div className={styles.wrap}>
        {false && <DevTools />}
        <Login pathname={pathname} />
        {/* <BackTop /> */}
        <Modal modalStore={this.props.modalStore} />
        <DetailModal detailModalStore={this.props.detailModalStore} />
        <Message messageStore={this.props.messageStore} />
        <PayModal payModalStore={this.props.payModalStore} />
        <NavBar />
        <div className={styles.box}>
          <div className={styles.content}>
            {this.props.children}
            {/* {React.cloneElement(this.props.children, this.props)} */}
          </div>
        </div>
      </div>
    );
  }
}
