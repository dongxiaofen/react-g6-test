import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import TrademarkCard from './TrademarkCard';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';

function TredeBody({trademarkInfo}) {
  return (
    <div>
      <div className="clearfix">
        {
          trademarkInfo ?
            trademarkInfo.map( (item, index) => <TrademarkCard key={`trademarkInfoData${index}`} cardData={item} />) : ''
        }
      </div>
      <Pager tData={trademarkInfo} module="trademarkLists" type="small" />
    </div>
  );
}

TredeBody.propTypes = {
  trademarkInfo: PropTypes.object,
};
export default loadingComp(
  {mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    errCategory: 0,
    module: '商标'
  })}
)(observer(TredeBody));
