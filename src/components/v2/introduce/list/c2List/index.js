import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';
import ListItem from './ListItem';

const C2List = ({introduceStore}) => {
  return (
    <div>
      <div style={{paddingBottom: '20px'}}>
        {
          introduceStore.list.content.map((item, idx) => (
            <ListItem key={idx} data={item}/>
          ))
        }
      </div>
      <div style={{paddingBottom: '20px'}}>
        <Pager module="introducePager" />
      </div>
    </div>
  );
};
C2List.propTypes = {
  introduceStore: PropTypes.object,
  // uiStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    height: 600,
    imgCategory: 13,
    category: 2,
    errCategory: 2,
  }),
})(inject('introduceStore')(observer(C2List)));
