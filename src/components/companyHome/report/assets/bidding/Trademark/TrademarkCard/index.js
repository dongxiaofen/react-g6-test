import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import noImg from 'imgs/noData/noimg.jpg';
import Popover from 'antd/lib/popover';
import config from 'dict/reportModule';


function TrademarkCard({ cardData }) {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img className={styles.iconImg} src={cardData.base64 !== '' ? 'data:image/jpg;base64,' + cardData.base64 : noImg} />
      </div>
      <div className={styles.text}>
        {['name', 'flowStatus', 'flowStatusTime', 'category'].map( key => {
          if (key === 'category') {
            if (cardData[key]) {
              let type = cardData[key];
              if (type.length > 17) {
                type = type.substr(0, 17) + '...';
              }
              return (
                <div key={`${key}100121`} className={styles.type}>
                  <span>商标分类：</span>
                  { type ?
                    <Popover placement="top" trigger="hover" content={cardData[key]}>
                      <span>{type}</span>
                    </Popover> :
                    <span>{type ? type : '--' }</span>
                  }
                </div>
              );
            }
            return null;
          }
          return (
            <div key={`${key}1001698`} className={styles.message}>
              <span>{config.trademark[key]}：</span>
              {
                cardData[key] ?
                  <Popover placement="top" trigger="hover" content={cardData[key]}>
                    <span>{cardData[key] ? cardData[key] : '--'}</span>
                  </Popover> :
                  <span>{cardData[key] ? cardData[key] : '--'}</span>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}

TrademarkCard.propTypes = {
  foo: PropTypes.string,
};
export default observer(TrademarkCard);
