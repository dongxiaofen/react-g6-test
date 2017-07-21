import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import CONFIG from 'dict/reportModule';
import styles from './index.less';
function DetailTable({itemData, body, dict, rowIdx, hasNumber, maxCols, linkJumpStore, detailModalStore}) {
  const redirectReport = (companyName)=> {
    detailModalStore.closeAction();
    linkJumpStore.getNameType(companyName);
  };
  const getValue = (config, value) => {
    let actValue = value;
    if (!value) {
      return '--';
    }
    if (config.modifyType === 'date') {
      actValue = value.slice(0, 10);
    }
    if (config.modifyType === 'companyName') {
      actValue = <a className={styles.companyName} onClick={redirectReport.bind(null, value)}>{value}</a>;
    }
    if (config.modifyType === 'relationShip') {
      actValue = value.join(' / ');
    }
    if (config.modifyBlock) {
      actValue = config.modifyBlock(value, itemData);
    }
    if (!(value instanceof Array) && (JSON.stringify(value).indexOf('div') >= 0)) {
      actValue = <span dangerouslySetInnerHTML={{ __html: value }}></span>;
    }
    return actValue;
  };
  const caculateRowsSpan = () => {
    let rowSpan = 0;
    body.forEach((configs)=>{
      if (configs[0].kids) {
        rowSpan += itemData[configs[0].key].length;
      } else {
        rowSpan ++;
      }
    });
    return rowSpan;
  };
  const createTableRow = ()=> {
    const output = [];
    body.forEach((configs, idx)=> {
      const td = [];
      if (configs.length < 2 && configs[0].kids) {
        itemData[configs[0].key].forEach((kidData, kidIdx)=> {
          const tdKid = [];
          configs[0].kids.forEach((kidConfig)=> {
            const colWidth = ((100 - 3.2) / maxCols) * kidConfig.colSpan;
            const valueCss = kidConfig.keyType === 'important' ? styles.valueImpor : styles.value;
            tdKid.push(
              <td colSpan={kidConfig.colSpan} key={`${idx}-${kidIdx}-${kidConfig.key}`} style={{width: `${colWidth}%`}}>
                <div className={styles.label}>{CONFIG[dict][kidConfig.key]}：</div>
                <div className={valueCss}>{getValue(kidConfig, kidData[kidConfig.key])}</div>
              </td>);
          });
          output.push(
            <tr key={`${rowIdx}-${idx}-${kidIdx}`}>
              {tdKid}
            </tr>
          );
        });
      } else {
        configs.forEach((config, index)=>{
          let colSpan = config.colSpan || 1;
          colSpan = config.colSpanHandle ? config.colSpanHandle(itemData[config.key], itemData) : colSpan;
          const colWidth = ((100 - 3.2) / maxCols) * colSpan;
          let valueCss = '';
          if (config.keyType === 'important') {
            valueCss = styles.valueImpor;
          } else if (config.keyType === 'block') {
            valueCss = styles.value;
          }
          if (colWidth > 0) {
            td.push(
              <td colSpan={colSpan} key={`${idx}-${index}`} style={{width: `${colWidth}%`}}>
                <div className={styles.label}>{CONFIG[dict][config.key]}：</div>
                <div className={valueCss}>{getValue(config, itemData[config.key])}</div>
              </td>);
          }
        });
        output.push(
          <tr key={`${rowIdx}-${idx}`}>
            {
              idx === 0 && hasNumber ?
              <th rowSpan={caculateRowsSpan()} className={styles.number} style={{width: '3.2%'}}>{rowIdx + 1}</th>
              : null
            }
            {td}
          </tr>
        );
      }
    });
    return output;
  };
  return (
    <table className={styles.table}>
      <tbody>
        {createTableRow()}
      </tbody>
    </table>
  );
}

DetailTable.propTypes = {
  foo: PropTypes.string,
};
export default inject('linkJumpStore', 'detailModalStore')(observer(DetailTable));
