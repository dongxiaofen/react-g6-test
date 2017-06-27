import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
import Detail from './Detail';

function DetailItem({item, isFocus, idx, toggleFocusName, showDetail, modalFocusIdx, isExpend, toggleExpand}) {
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
        <span className={isFocus ? styles.itemNameFocus : styles.itemName} onClick={toggleFocusName.bind(this, idx)}>{document.getElementById('reportContainer') ? getTextOverflow(item.blackListNode) : ''}</span>
        <a className={styles.expand} title={isExpend === 0 ? '展开' : ''} onClick={toggleExpand.bind(this, idx)}>
          <i className={isExpend ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
        </a>
      </div>
      {
        isExpend ?
          item.disruptTypeList.map((obj, index) =>
            <Detail
              key={obj.type + index}
              data={obj}
              index={index}
              modalFocusIdx={modalFocusIdx}
              showDetail={showDetail} />
          ) : ''
      }
    </div>
  );
}

DetailItem.propTypes = {
  foo: PropTypes.string,
};
export default observer(DetailItem);
