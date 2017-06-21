import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import CompanyName from './CompanyName';
// import MonitorStatus from './MonitorStatus';
import CompanyStatus from './CompanyStatus';
// import StockType from './StockType';
import Risk from './Risk';
import FrName from './FrName';
// import Address from './Address';
import Highlight from './Highlight';
import Capital from './Capital';
import RegistDate from './RegistDate';
import Purchasedservice from './Purchasedservice';

function SearchItemLeft({itemData, searchParameter}) {
  return (
    <div className={`${styles.itemLeftWrap}`}>
      <div className={`${styles.itemMessage}`}>
        <CompanyName itemData={itemData} />
        {/* <MonitorStatus itemData={itemData} /> */}
        <Purchasedservice itemData={itemData} />
        {/* <StockType itemData={itemData} /> */}
        <Risk itemData={itemData} />
      </div>
      <div className={`${styles.itemMessage}`}>
        <CompanyStatus itemData={itemData} />
        <FrName itemData={itemData} />
        <Capital itemData={itemData} />
        <RegistDate itemData={itemData} />
      </div>
      {/* <div className={`${styles.itemMessage}`}>
        <Address itemData={itemData} />
      </div> */}
      {/* <div className={`${styles.itemMessage} ${styles.itemMessagePosition}`}> */}
      <Highlight
        itemData={itemData}
        searchParameter={searchParameter} />
      {/* </div> */}
    </div>
  );
}

SearchItemLeft.propTypes = {
  itemData: PropTypes.object,
  searchParameter: PropTypes.object
};
export default observer(SearchItemLeft);
