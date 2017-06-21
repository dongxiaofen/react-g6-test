import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
// import { ModuleTitle, CardTable } from 'components/common/report';
// import { ModuleTitle } from 'components/common/report';
// import ErrorText from 'components/common/ErrorText';
import PosItem from './PosItem';
// import styles from './index.less';
import { loadingComp } from 'components/hoc';

function PosAndInvList({investmentStore}) {
  const output = [];
  const manageData = investmentStore.manageData;
  if (manageData.length > 0 ) {
    manageData.forEach((item, idx) => {
      output.push(
        <PosItem posItemData={item} posItemIndex={idx} key={`${idx}PosAndInvMain`}/>
      );
    });
  }
  return (
    <div>
      {output}
    </div>
  );
}

PosAndInvList.propTypes = {
  investmentStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: props.module
  })
})(inject('investmentStore')(observer(PosAndInvList)));
