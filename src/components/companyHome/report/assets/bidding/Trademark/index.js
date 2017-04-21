import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
// import styles from './index.less';
import { ModuleTitle } from 'components/common/report';
import TrademarkCard from '../TrademarkCard';
import { loadingComp } from 'components/hoc';

function Trademark({ trademarkInfo }) {
  return (
    <div>
      <ModuleTitle module="商标" />
      {
        trademarkInfo ?
          trademarkInfo.map( (item, index) => <TrademarkCard key={`trademarkInfoData${index}`} cardData={item} />) : ''
      }
    </div>
  );
}

Trademark.propTypes = {
  assetsStore: PropTypes.object,
};

export default inject('assetsStore')(loadingComp(
  {mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    errCategory: 1,
    module: props.module
  })}
)(observer(Trademark)));

