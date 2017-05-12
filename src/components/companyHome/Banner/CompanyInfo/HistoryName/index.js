import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'components/lib/popover';

function HistoryName({hisNameVis, historyName, closeHisNamePopoverAlias, openHisNamePopoverAlias}) {
  if ( historyName && historyName.length > 0) {
    const createHisNameItem = () => {
      const output = [];
      historyName.map((item, idx) => {
        output.push(
          <div key={`${item.time}${idx}`}>
            <p className={styles.time}>更名<span className={styles.line}>|</span>{item.time}</p>
            <p className={styles.name}>{item.name}</p>
          </div>
        );
      });
      return <div className={styles.historyName}><i className={styles.close} onClick={closeHisNamePopoverAlias}></i>{output}</div>;
    };

    return (
      <div className={styles.contactInfoHistory}>
        <Popover
          visible={hisNameVis}
          left="0px"
          top="10px"
          content={createHisNameItem()}
          closePopover={closeHisNamePopoverAlias}
          openPopover={openHisNamePopoverAlias}
          id="historyName">
          <span className={`${styles.historyNameBtn}`}>
            历史更名
            <i className={`fa fa-angle-down ${hisNameVis ? styles.rotate : ''}`}></i>
          </span>
        </Popover>
      </div>
    );
  }
  return null;
}

HistoryName.propTypes = {
  foo: PropTypes.string,
};
export default observer(HistoryName);
