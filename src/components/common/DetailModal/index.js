import React from 'react';
import { observer, inject } from 'mobx-react';
import DetailModal from 'components/lib/DetailModal';

function _DetailModal({detailModalStore}) {
  const {
    visible,
    closeAction,
    titleComp,
    contentComp,
    sourceComp
  } = detailModalStore;
  return (
    <div>
      <DetailModal
        visible={visible}
        titleComp={titleComp}
        contentComp={contentComp}
        sourceComp={sourceComp}
        closeAction={closeAction}/>
    </div>
  );
}
export default inject('detailModalStore')(observer(_DetailModal));
