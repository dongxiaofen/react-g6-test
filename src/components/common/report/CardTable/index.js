import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';

function CardTable({}) {
  return (
    <div>
      {/* <CardTitle />
      <CardExpand />
      <CardBody /> */}
    </div>
  );
}

CardTable.propTypes = {
  foo: PropTypes.string,
};
export default observer(CardTable);
