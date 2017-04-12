import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import styles from './index.less';
// import MyAlert from 'components/common/MyAlert';
// import Modal from 'components/common/Modal';

@observer
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object
  };
  render() {
    const pathname = this.props.location.pathname;
    if (pathname === '/' || pathname === '/pdfDown' || pathname === '/solution' || pathname === '/about') {
      return (
        <div className={styles.container}>
          {/* {
            pathname === '/pdfDown' ? '' :
            <Login {...this.props} />
          } */}
          {React.cloneElement(this.props.children, this.props)}
        </div>
      );
    }
    return (
      <div className={styles.wrap}>
        {false && <DevTools />}
        {/* <Login {...this.props} /> */}
        {/* <BackTop /> */}
        {/* <MenuBar {...this.props} /> */}
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
