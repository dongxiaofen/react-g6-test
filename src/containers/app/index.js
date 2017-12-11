import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
// import NavBar from 'components/NavBar';
import BackToTop from 'components/BackToTop';
import Modal from 'components/common/Modal';
// import DetailModal from 'components/common/DetailModal';
import Message from 'components/common/Message';
// import PayModal from 'components/common/PayModal';
// import EntireLoading from 'components/common/EntireLoading';
import Header from 'components/common/HeaderNav';


// @inject('clientStore', 'modalStore', 'detailModalStore', 'messageStore', 'payModalStore', 'entireLoadingStore')
@inject('clientStore', 'modalStore', 'messageStore')
@observer
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
    // headerStore: PropTypes.object,
    clientStore: PropTypes.object,
    modalStore: PropTypes.object,
    // detailModalStore: PropTypes.object,
    messageStore: PropTypes.object,
    // payModalStore: PropTypes.object,
    // entireLoadingStore: PropTypes.object,
  };
  componentDidMount() {
    const pathname = this.props.location.pathname;
    if (pathname !== '/login') {
      this.props.clientStore.getUserInfo();
    }
  }

  render() {
    const pathname = this.props.location.pathname;
    return (
      <div className={styles.wrap}>
        {false && <DevTools />}
        <Modal modalStore={this.props.modalStore} />
        <Message messageStore={this.props.messageStore} />
        <BackToTop />
        {/* <DetailModal detailModalStore={this.props.detailModalStore} />
        <PayModal payModalStore={this.props.payModalStore} /> */}
        {/* <EntireLoading entireLoadingStore={this.props.entireLoadingStore} /> */}
        {
          pathname !== '/login' ? <Header /> : null
        }
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
