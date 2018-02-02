import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import ApiLi from './apiLi';
import Info from './info';
import styles from './index.less';
const List = ({apiListDetailStore}) => {
  return (
    <div>
      <h3 className={styles.title}>{apiListDetailStore.classificationName}</h3>
      <ApiLi />
      <Info />
    </div>
  );
};
List.propTypes = {
  apiListDetailStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 0,
    height: 400
  }),
})(inject('apiListDetailStore')(observer(List)));
