import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';import PdfNotFound from 'components/common/pdf/PdfNotFound';
import ManagementItem from './ManagementItem';

function ShareholderInvestment({moduleData}) {
  if (!moduleData || moduleData.length === 0) {
    return (
      <div>
        <div style={{marginTop: '30px'}}></div>
        <PdfNotFound />
      </div>
    );
  }

  return (
    <div>
      { moduleData.map((item, index) => <ManagementItem key={index} shareHolderData={item}/>)}
    </div>);
}

ShareholderInvestment.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(ShareholderInvestment);
