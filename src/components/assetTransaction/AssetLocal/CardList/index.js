import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { Row } from 'components/common/layout';
import Card from './Card';
import { loadingComp } from 'components/hoc';

function CardList({ assetLocalData }) {
  const modifyMoney = (value) => {
    return `${(value / 10000).toFixed(2)}万元`;
  };

  const modifyRightNum = (value) => {
    return `${value}笔`;
  };

  const nowrap = (value) => {
    return value;
  };

  const createCards = (assetType, config) => {
    return assetLocalData.map((item, key) => {
      const type = assetType[item.type];
      return (
        <Card
          key={`assetLocalCardListKey${key}`}
          data={item}
          config={config[type]}
          type={type} />
      );
    });
  };

  const assetType = {
    '交易资产': 'tradingAssets',
    '招商资产': 'investAssets',
    '拍卖资产': 'saleAssets'
  };
  const config = {
    'tradingAssets': {
      dataKey: [
        { key: 'assetTotal', handle: modifyMoney },
        { key: 'creditorRightsNum', handle: modifyRightNum },
        { key: 'assignor', handle: nowrap },
        { key: 'assignee', handle: nowrap },
      ],
      dateKey: 'releaseDate'
    },
    'saleAssets': {
      dataKey: [
        { key: 'startPrice', handle: modifyMoney },
        { key: 'evaluatedPrice', handle: modifyMoney },
        { key: 'handledDepartment', handle: nowrap },
        { key: 'auctionRounds' },
      ],
      dateKey: 'startDate/endDate'
    },
    'investAssets': {
      dataKey: [
        { key: 'assetTotal', handle: modifyMoney },
        { key: 'creditorRightsNum', handle: modifyRightNum },
        { key: 'assignor', width: '12', handle: nowrap },
      ],
      dateKey: 'releaseDate'
    }
  };
  return (
    <Row>
      {createCards(assetType, config)}
    </Row>
  );
}

CardList.propTypes = {
  assetLocalData: PropTypes.object,
  assetLocalLoading: PropTypes.bool,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.assetLocalLoading,
    category: 0,
    error: props.assetLocalData.length === 0,
    errCategory: 2,
  })
})(observer(CardList));
