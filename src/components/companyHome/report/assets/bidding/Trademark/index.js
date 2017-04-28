import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import { ModuleTitle } from 'components/common/report';
import TrademarkCard from './TrademarkCard';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';

function Trademark({ trademarkInfo }) {
  return (
    <div>
      <div className="clearfix">
        <ModuleTitle module="商标" />
        {
          trademarkInfo ?
            trademarkInfo.map( (item, index) => <TrademarkCard key={`trademarkInfoData${index}`} cardData={item} />) : ''
        }
      </div>
      <Pager tData={trademarkInfo} module="trademarkLists" type="small" />
    </div>
  );
}

Trademark.propTypes = {
  isLoading: PropTypes.bool,
};

export default loadingComp(
  {mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    errCategory: 1,
    module: '商标'
  })}
)(observer(Trademark));
