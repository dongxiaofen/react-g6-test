import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import Trow from './Trow';

function Tbody({meta, items, dict}) {
  return (
    <tbody>
      {
        meta.map((rMeta, idx) => {
          return <Trow key={rMeta[0].key + idx} rMeta={rMeta} items={items} dict={dict} />;
        })
      }
    </tbody>
  );
}

Tbody.propTypes = {
  meta: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  dict: PropTypes.string.isRequired
};
export default observer(Tbody);
