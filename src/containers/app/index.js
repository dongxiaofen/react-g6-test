import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
// import NavBar from 'components/NavBar';
// import BackToTop from 'components/BackToTop';
// import Modal from 'components/common/Modal';
// import DetailModal from 'components/common/DetailModal';
// import Message from 'components/common/Message';
// import PayModal from 'components/common/PayModal';
// import EntireLoading from 'components/common/EntireLoading';
// import Footer from 'components/common/Footer';


// @inject('clientStore', 'modalStore', 'detailModalStore', 'messageStore', 'payModalStore', 'entireLoadingStore')
@observer
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object,
    // clientStore: PropTypes.object,
    // modalStore: PropTypes.object,
    // detailModalStore: PropTypes.object,
    // messageStore: PropTypes.object,
    // payModalStore: PropTypes.object,
    // entireLoadingStore: PropTypes.object,
  };
  // componentDidMount() {}

  render() {
    return (
      <div className={styles.wrap}>
        {false && <DevTools />}
        {/* <BackToTop />
        <Modal modalStore={this.props.modalStore} />
        <DetailModal detailModalStore={this.props.detailModalStore} />
        <Message messageStore={this.props.messageStore} /> */}
        {/* <PayModal payModalStore={this.props.payModalStore} /> */}
        {/* <EntireLoading entireLoadingStore={this.props.entireLoadingStore} /> */}
        {/* <NavBar /> */}
        <div className={styles.box}>
          <div className={styles.content}>
            {this.props.children}
            {/* {React.cloneElement(this.props.children, this.props)} */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}
