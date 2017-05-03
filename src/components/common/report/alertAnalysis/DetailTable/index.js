import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import CONFIG from 'dict/reportModule';
import styles from './index.less';

function DetailTable({itemData, body, dict, rowIdx, hasNumber, maxCols}) {
  const getValue = (config, value) => {
    let actValue = value;
    if (config.modifyBlock) {
      actValue = config.modifyBlock(value, itemData);
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
            tdKid.push(
              <td colSpan={kidConfig.colSpan} key={`${idx}-${kidIdx}-${kidConfig.key}`} style={{width: `${colWidth}%`}}>
                {CONFIG[dict][kidConfig.key]}：{getValue(kidConfig, kidData[kidConfig.key])}
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
          console.log(colSpan);
          colSpan = config.colSpanHandle ? config.colSpanHandle(itemData[config.key], itemData) : colSpan;
          const colWidth = ((100 - 3.2) / maxCols) * colSpan;
          if (colWidth > 0) {
            td.push(
              <td colSpan={colSpan} key={`${idx}-${index}`} style={{width: `${colWidth}%`}}>
                {CONFIG[dict][config.key]}：{getValue(config, itemData[config.key])}
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
export default observer(DetailTable);
