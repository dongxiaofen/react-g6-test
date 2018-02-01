import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';

function InterfaceFile({apiListDetailStore}) {
  return (
    <div className={styles['file-html']} dangerouslySetInnerHTML={{__html: apiListDetailStore.apiDoc.content}}>
    </div>
  );
}

InterfaceFile.propTypes = {
  apiListDetailStore: PropTypes.object,
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
})(inject('apiListDetailStore')(observer(InterfaceFile)));
