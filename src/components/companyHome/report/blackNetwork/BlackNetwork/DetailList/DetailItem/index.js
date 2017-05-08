import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
import Detail from './Detail';

function DetailItem({item, isExpand, idx, toggleExpand, showDetail, modalFocusIdx}) {
  const getTextOverflow = (text) => {
    const showTextNum = (document.getElementById('reportContainer').offsetWidth * 5 / 24 - 150) / 14;
    return (
      showTextNum < text.length ?
      <Popover placement="top" trigger="hover" content={text}>
        <span>{showTextNum < text.length ? `${text.substr(0, showTextNum)}...` : text}</span>
      </Popover> :
      text
    );
  };
  return (
    <div>
      <div className={styles.item}>
        <span className={styles.level}>{item.level}层</span>
        <span className={isExpand === 0 ? styles.itemName : styles.itemNameFocus}>{document.getElementById('reportContainer') ? getTextOverflow(item.blackListNode) : ''}</span>
        <a className={styles.expand} onClick={toggleExpand.bind(this, idx)} title={isExpand === 0 ? '展开' : ''}>
          <i className={isExpand === 0 ? 'fa fa-angle-down' : 'fa fa-angle-up'}></i>
        </a>
      </div>
      {
        isExpand === 0 ? '' :
          item.disruptTypeList.map((obj, index) =>
            <Detail
              key={obj.type + index}
              data={obj}
              index={index}
              modalFocusIdx={modalFocusIdx}
              showDetail={showDetail} />
          )
      }
    </div>
  );
}

DetailItem.propTypes = {
  foo: PropTypes.string,
};
export default observer(DetailItem);
