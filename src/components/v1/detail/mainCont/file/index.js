import React, { Component, PropTypes } from 'react';
// import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';

class InterfaceFile extends Component {
  static propTypes = {
    interfaceDetailStore: PropTypes.object,
  };
  componentDidMount() {
    const anchorList = document.getElementsByClassName('doc-spear-point');
    const scrollToPosition = (yPos) => {
      // yPos滚动后的最终位置
      let yPosition = document.documentElement.scrollTop || document.body.scrollTop;
      let timer;
      timer = setInterval(() => {
        yPosition += 10;
        if (yPosition > yPos) {
          window.scrollTo(0, yPos);
          clearInterval(timer);
        } else {
          window.scrollTo(0, yPosition);
        }
      }, 5);
    };
    const handleScroll = (evt) => {
      const name = evt.target.getAttribute('data-href');
      const scrollTart = document.getElementsByName(name)[0];
      const targetHeight = scrollTart.offsetTop;
      // const scrolledHeight = document.documentElement.scrollTop || document.body.scrollTop;
      scrollToPosition(targetHeight + 360);
    };
    for (let num = 0; num < anchorList.length; num++) {
      const anchor = anchorList[num];
      const name = anchor.hash.replace('#', '');
      anchor.setAttribute('data-href', name);
      anchor.removeAttribute('href');
      anchor.onclick = handleScroll;
    }
  }
  render() {
    return (
      <div className={styles['file-html']} dangerouslySetInnerHTML={{__html: this.props.interfaceDetailStore.interfaceDoc.data}}>
      </div>
    );
  }
}

InterfaceFile.propTypes = {
  interfaceDetailStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 11,
    category: 0,
    errCategory: 2,
    height: 400
  }),
})(inject('interfaceDetailStore')(observer(InterfaceFile)));
