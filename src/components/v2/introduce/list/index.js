import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import { loadingComp } from 'components/hoc';
import Filter from './filter';
import C2List from './c2List';
const List = ({ introduceStore }) => {
  // console.log(introduceStore.isListLoading, 'introduceStore.isListLoading');
  return (
    <div>
      <Filter />
      <C2List data={{loading: introduceStore.isListLoading, error: introduceStore.list.error}}/>
    </div>
  );
};

List.propTypes = {
  introduceStore: PropTypes.object,
  // uiStore: PropTypes.object,
};

// export default loadingComp({
//   mapDataToProps: props => ({
//     loading: props.data.loading,
//     error: props.data.error,
//     imgCategory: 13,
//     category: 0,
//     errCategory: 0,
//     height: 600
//   }),
// })(inject('introduceStore', 'uiStore')(observer(List)));
export default inject('introduceStore')(observer(List));
