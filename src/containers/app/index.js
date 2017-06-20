import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
import Login from 'components/Login';
import NavBar from 'components/NavBar';
import BackToTop from 'components/BackToTop';
// import MyAlert from 'components/common/MyAlert';
import Modal from 'components/common/Modal';
import DetailModal from 'components/common/DetailModal';
import Message from 'components/common/Message';
import PayModal from 'components/common/PayModal';
import EntireLoading from 'components/common/EntireLoading';

@inject('clientStore', 'modalStore', 'detailModalStore', 'messageStore', 'payModalStore', 'entireLoadingStore')
@observer
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
    clientStore: PropTypes.object,
    modalStore: PropTypes.object,
    detailModalStore: PropTypes.object,
    messageStore: PropTypes.object,
    payModalStore: PropTypes.object,
    entireLoadingStore: PropTypes.object,
  };
  componentDidMount() {
    this.reloadCom();
    const exg = /.*main-(.*)(?:.js)$/;
    if (this.props.clientStore.envConfig !== 'local') {
      setInterval(() => {
        const assetsHash = document.querySelector('#mainJs').getAttribute('src').match(exg)[1];
        this.props.messageStore.isAssetsNewest(assetsHash);
      }, 90 * 1000);
    }
  }
  reloadCom() {
    require.ensure([], (require) => {
      require('components/common/reportOper/CreateLoanRep');
      require('components/common/reportOper/CreateMonitor');
    });
  }
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
    if (pathname === '/disclaimer' || pathname === '/userAgreement') {
      return (
        <div className={styles.container}>
          {this.props.children}
        </div>
      );
    }
    return (
      <div className={styles.wrap}>
        {false && <DevTools />}
        <Login pathname={pathname} />
        <BackToTop />
        <Modal modalStore={this.props.modalStore} />
        <DetailModal detailModalStore={this.props.detailModalStore} />
        <Message messageStore={this.props.messageStore} />
        <PayModal payModalStore={this.props.payModalStore} />
        <EntireLoading entireLoadingStore={this.props.entireLoadingStore} />
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
