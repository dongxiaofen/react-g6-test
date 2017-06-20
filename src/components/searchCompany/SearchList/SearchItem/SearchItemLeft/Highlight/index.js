import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Highlight({itemData, searchParameter}) {
  // 曾用名
  const highlight = [];
  if (itemData.highlight && itemData.highlight.length > 0) {
    const searchType = Object.keys(searchParameter)[0];
    const KEYMAP = {'历史名称': '曾用名'};
    itemData.highlight.map((obj, idx)=> {
      highlight.push(
        <span key={`${idx}name`}>
          {KEYMAP[obj.key] || obj.key}：<span dangerouslySetInnerHTML={{__html: obj.value}}></span>
        </span>
      );
      if (searchType !== 'contacts') {
        return true;
      }
    });
  } else {
    return null;
  }
  return (
    <div className={`${styles.highlight}`}>
      {highlight}
    </div>
  );
}

Highlight.propTypes = {
  itemData: PropTypes.object,
  searchParameter: PropTypes.object
};
export default observer(Highlight);
