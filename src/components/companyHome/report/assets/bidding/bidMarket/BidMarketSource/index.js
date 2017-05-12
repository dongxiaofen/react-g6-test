import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Source from './Source';

function BidMarketSource({assetsStore}) {
  const { titleData } = assetsStore;
  return (<Source url={titleData.url} source={titleData.website} />);
}

BidMarketSource.propTypes = {
  assetStore: PropTypes.object,
};
export default inject('assetsStore')(observer(BidMarketSource));
