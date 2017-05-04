import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function CardList({}) {
  return (
    <div className={styles}>
      this is CardList
    </div>
  );
}

CardList.propTypes = {
  foo: PropTypes.string,
};
export default observer(CardList);
