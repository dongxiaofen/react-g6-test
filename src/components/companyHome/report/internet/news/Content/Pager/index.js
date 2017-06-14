import React from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from 'components/lib/pagination';
function Pager({uiStore, internetStore, companyHomeStore, total}) {
  const pageParams = uiStore.uiState.news;
  const pageChange = (page) => {
    uiStore.updateUiStore('news.index', page);
    const reportInfo = companyHomeStore.reportInfo;
    const params = uiStore.uiState.news;
    internetStore.getInternet(reportInfo, params);
  };
  if (total <= 10) {
    return null;
  }
  return (
    <div style={{textAlign: 'right'}}>
      <Pagination
        current={pageParams.index}
        pageSize={pageParams.size}
        total={total}
        onChange={pageChange}
        simple
        />
    </div>
  );
}
export default inject('uiStore', 'internetStore', 'companyHomeStore')(observer(Pager));
