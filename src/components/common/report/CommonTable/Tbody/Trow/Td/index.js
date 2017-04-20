import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';

function Td({ keyObj, rData }) {
  let td = null;
  if (keyObj.modifyText) {
    td = <td key={keyObj.key}>{keyObj.modifyText(rData[keyObj.key])}</td>;
  } else if (keyObj.modifyBlock) {
    td = <td key={keyObj.key}>{keyObj.modifyBlock(rData)}</td>;
  } else {
    td = <td key={keyObj.key}>{rData[keyObj.key] ? rData[keyObj.key] : '--'}</td>;
  }
  return (td);
}

Td.propTypes = {
  keyObj: PropTypes.object.isRequired,
  rData: PropTypes.object.isRequired
};
export default observer(Td);
