import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Td from './Td';
import config from 'dict/reportModule';

function Trow({rMeta, items, dict}) {
  const getValue = (tMeta, value) => {
    let output = '';
    if (tMeta.modifyText) {
      output = tMeta.modifyText();
    } else if (tMeta.modifyBlock) {
      output = tMeta.modifyBlock(value);
    } else {
      output = value ? value : '--';
    }
    return output;
  };
  const getTd = (tMeta) => {
    const td = [];
    td.push(<Td position="left" value={config[dict][tMeta.key]} type={tMeta.type} />);
    td.push(<Td position="right" value={getValue(tMeta, items[tMeta.key])} type={tMeta.type} />);
    return td;
  };
  return (
    <tr>
      {
        rMeta.map((tMeta)=>{
          return getTd(tMeta);
        })
      }
    </tr>
  );
}

Trow.propTypes = {
  rMeta: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  dict: PropTypes.string.isRequired
};
export default observer(Trow);
