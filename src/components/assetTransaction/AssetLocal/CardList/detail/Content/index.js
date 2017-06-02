import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';

import SaleAssets from 'components/assetTransaction/AssetLocal/CardList/detail/SaleAssets';

function Content({ assetTransactionStore }) {
  const createContent = (data) => {
    if (data.type === '拍卖资产') {
      return (
        <SaleAssets
          data={data}
          swiperImg={assetTransactionStore.assetLocalSwiperImg}
          setAssetLocalSwiperImg={assetTransactionStore.setAssetLocalSwiperImg} />
      );
    }
    return <div dangerouslySetInnerHTML={{ __html: data.content }}></div>;
  };
  const assetLocalDetail = assetTransactionStore.assetLocalDetail;
  return (
    <div className="clearfix" style={{ padding: 20 }}>
      {createContent(assetLocalDetail)}
    </div>
  );
}

Content.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(Content));
