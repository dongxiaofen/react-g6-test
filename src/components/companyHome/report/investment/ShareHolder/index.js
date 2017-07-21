import React from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import ShareHolderList from './ShareHolderList';
function ShareHolder({investmentStore}) {
  const shData = investmentStore.shareholders;
  const count = shData.length ? shData.length : 0;
  const isLoading = this.props.investmentStore.loading;
  const error = this.props.investmentStore.shareholders.error;
  return (
    <div>
      <ModuleTitle module="股东投资任职" count={count}/>
      <ShareHolderList isLoading={isLoading} error={error} shareholders={shData} module="对外投资任职"/>
    </div>
  );
}
export default observer(ShareHolder);
