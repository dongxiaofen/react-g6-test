import React from 'react';
import {observer, inject} from 'mobx-react';
import ContentBody from 'components/common/AlertCard/DetailCom/Content';
function Content({riskHeadlinesStore}) {
  const content = riskHeadlinesStore.detailModalData.content;
  return <ContentBody content={content}/>;
}
export default inject('riskHeadlinesStore')(observer(Content));
