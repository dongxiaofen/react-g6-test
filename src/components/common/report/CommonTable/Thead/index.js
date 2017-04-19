import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import config from 'dict/reportModule';

function Thead({meta, dict}) {
  const getThead = () => {
    const thead = [];
    meta.map((keyObj) => {
      thead.push(
        <th key={keyObj.key} style={{ width: keyObj.width * 10 + '%' }}>
          {config[dict][keyObj.key]}
        </th>
      );
    });
    return thead;
  };
  return (
    <thead className={styles.thead}>
      <tr>{getThead()}</tr>
    </thead>
  );
}

Thead.propTypes = {
  meta: PropTypes.array.isRequired,
  dict: PropTypes.string.isRequired
};
export default observer(Thead);
