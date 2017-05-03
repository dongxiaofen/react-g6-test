import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Pager from 'components/common/Pager';
import BlackSingleList from './BlackSingleList';
import { loadingComp } from 'components/hoc';


function DishonestyBody({dishonestyList, uiStore}) {
  const {index, size } = uiStore.uiState.dishonesty;
  const dishonestyListData = dishonestyList.slice((index - 1) * size, index * size);
  return (
    <div>
      {
        dishonestyListData ? dishonestyListData.map((item, numbers) => <BlackSingleList listData={item} key={`blackList${numbers}`} index={numbers + 1} />) : ''
      }
      <Pager uiStore={uiStore} type="small" module="dishonesty" tData={dishonestyList} />
    </div>
  );
}

DishonestyBody.propTypes = {
  isLoading: PropTypes.bool,
  dishonestyList: PropTypes.object,
  error: PropTypes.bool,
  module: PropTypes.string,
};
export default loadingComp(
  {
    mapDataToProps: props => ({
      loading: props.isLoading,
      category: 0,
      error: props.error,
      module: props.module
    })
  }
)(inject('uiStore')(observer(DishonestyBody)));
