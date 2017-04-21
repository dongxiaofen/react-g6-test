import React from 'react';
import {observer, inject} from 'mobx-react';
import InfoBody from 'components/common/AlertCard/DetailCom/Info';
function Info({riskHeadlinesStore}) {
  const info = riskHeadlinesStore.detailModalData.info;
  return <InfoBody store={riskHeadlinesStore} data={info} cardType="modal"/>;
}
export default inject('riskHeadlinesStore')(observer(Info));
