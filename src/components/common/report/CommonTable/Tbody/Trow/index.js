import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Td from './Td';

function Trow({ meta, rData }) {
  return (
    <tr>
      {
        meta.map((keyObj) => {
          return <Td key={keyObj.key} rData={rData} keyObj={keyObj} />;
        })
      }
    </tr>
  );
}

Trow.propTypes = {
  foo: PropTypes.string,
};
export default observer(Trow);
