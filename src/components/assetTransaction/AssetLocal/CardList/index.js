import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'components/common/layout';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';

import Card from './Card';

function CardList({ assetLocalData, uiStore, getAssetLocalDetail, openDetailModal }) {
  const modifyMoney = (value) => {
    return `${(value / 10000).toFixed(2)}万元`;
  };

  const modifyRightNum = (value) => {
    return `${value}笔`;
  };

  const nowrap = (value) => {
    return value;
  };

  const _openDetailModal = () => {
    openDetailModal(
      (cb) => {
        require.ensure([], (require) => {
          cb(
            require('./detail/Title'),
            require('./detail/Content'),
          );
        });
      },
      '资产交易'
    );
  };

  const viewDetail = (type, data) => {
    getAssetLocalDetail({ type: data.type, id: data.data._id }, _openDetailModal);
  };

  const createCards = (assetType, config) => {
    return assetLocalData.map((item, key) => {
      const type = assetType[item.type];
      return (
        <Card
          key={`assetLocalCardListKey${key}`}
          data={item}
          config={config[type]}
          type={type}
          viewDetail={viewDetail.bind(this, type)} />
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
        { key: 'assignor', handle: nowrap },
      ],
      dateKey: 'releaseDate'
    }
  };
  return (
    <Row>
      {createCards(assetType, config)}
      <Col>
        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <Pager
            tData={assetLocalData}
            module="assetLocal"
            uiStore={uiStore}
            type="large" />
        </div>
      </Col>
    </Row>
  );
}

CardList.propTypes = {
  assetLocalData: PropTypes.object,
  uiStore: PropTypes.object,
  assetLocalLoading: PropTypes.bool,
  getAssetLocalDetail: PropTypes.func,
  openDetailModal: PropTypes.func,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.assetLocalLoading,
    category: 0,
    height: 300,
    error: props.assetLocalData.length === 0,
    errCategory: 2,
  })
})(observer(CardList));
