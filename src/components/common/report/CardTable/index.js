import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
import CardTitle from './CardTitle';

function CardTable({}) {
  return (
    <div>
      <CardTitle mainTitle="test" />
      {/* <CardExpand />
      <CardBody /> */}
    </div>
  );
}

CardTable.propTypes = {
  foo: PropTypes.string,
};
export default observer(CardTable);
