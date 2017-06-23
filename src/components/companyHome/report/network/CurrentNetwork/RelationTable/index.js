import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';

function RelationTable({networkStore}) {
  const {targetComp} = networkStore;
  const modifyContent = (moduleKey, item)=> {
    switch (moduleKey) {
      case '高管':
        return item.position.join('、');
      case '股东':
        const invCurrency = item.invCurrency === '' ? '' : `（${item.invCurrency}）`;
        return `投资金额${invCurrency}:${item.invConum}（${item.invRatio}%）`;
      default:
        return '--';
    }
  };
  const createTabel = (moduleKey)=>{
    targetComp['股东'] = targetComp['企业股东'].concat(targetComp['个人股东']);
    if (targetComp[moduleKey].length < 1) {
      return null;
    }
    const list = [];
    targetComp[moduleKey].map((item, idx)=>{
      if (typeof item === 'string') {
        list.push(<tr key={`relation${idx}`}><td>{item}</td></tr>);
      } else {
        list.push(
          <tr key={`relation${idx}`} className={styles.multiRow}>
            <td>{item.name}</td>
            <td>{modifyContent(moduleKey, item)}</td>
          </tr>
        );
      }
    });
    return (
      <table>
        <tr><th colSpan="2">{`${moduleKey}（${targetComp[moduleKey].length}）`}</th></tr>
        {list}
      </table>
    );
  };
  return (
    <div>
      <p className={styles.title}>一层关联关系表</p>
      <hr/>
      <div className={styles.content}>
        {createTabel('法人代表')}
        {createTabel('高管')}
        {createTabel('股东')}
        {createTabel('对外投资')}
        {createTabel('历史关联')}
      </div>
    </div>
  );
}

RelationTable.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore')(observer(RelationTable));
