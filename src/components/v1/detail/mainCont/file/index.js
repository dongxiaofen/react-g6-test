import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';

function InterfaceFile({interfaceDetailStore}) {
  return (
    <div className={styles['file-html']} dangerouslySetInnerHTML={{__html: interfaceDetailStore.interfaceDoc.data}}>
    </div>
  );
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