import React from 'react';
import { observer, inject } from 'mobx-react';
import Pagination from 'components/lib/pagination';
function Pager({uiStore, internetStore, routing, total}) {
  const pageParams = uiStore.uiState.news;
  const pageChange = (page) => {
    uiStore.updateUiStore('news.index', page);
    const {monitorId, reportId, companyName, companyType} = routing.location.query;
    const params = {
      monitorId,
      reportId,
      companyName,
      companyType,
      params: uiStore.uiState.news,
    };
    internetStore.getInternet(params);
  };
  return (
    <div style={{textAlign: 'right', marginTop: '20px'}}>
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
export default inject('uiStore', 'internetStore', 'routing')(observer(Pager));
