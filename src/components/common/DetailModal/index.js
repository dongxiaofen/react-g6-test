import React from 'react';
import { observer, inject } from 'mobx-react';
import DetailModal from 'components/lib/DetailModal';

function _DetailModal({detailModalStore}) {
  const {
    visible,
    closeAction,
    title,
    titleComp,
    contentComp,
    sourceComp,
    leftBarComp,
  } = detailModalStore;
  return (
    <div>
      <DetailModal
        visible={visible}
        title={title}
        titleComp={titleComp}
        contentComp={contentComp}
        sourceComp={sourceComp}
        leftBarComp={leftBarComp}
        closeAction={closeAction}/>
    </div>
  );
}
export default inject('detailModalStore')(observer(_DetailModal));
