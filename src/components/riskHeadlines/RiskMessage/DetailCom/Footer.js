import React from 'react';
import {observer, inject} from 'mobx-react';
import FooterBody from 'components/common/AlertCard/DetailCom/Footer';
function Footer({riskHeadlinesStore}) {
  const source = riskHeadlinesStore.detailModalData.source;
  const url = riskHeadlinesStore.detailModalData.url;
  return <FooterBody source={source} url={url}/>;
}
export default inject('riskHeadlinesStore')(observer(Footer));
