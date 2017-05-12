import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import BasicList from '../BasicList';
import styles from './index.less';
import pathval from 'pathval';

function AlertList({ myHomePageStore }) {
  return (
    <div className={styles.listContainer}>
      <ul className={styles.AlertWrap}>
        {
          pathval.getPathValue(myHomePageStore, 'alert.content') ? pathval.getPathValue(myHomePageStore, 'alert.content').map( (item, index) => <BasicList key={`alertlist${index}`} alertData={item} />) : ''
        }
      </ul>
    </div>
  );
}

AlertList.propTypes = {
  foo: PropTypes.string,
};
export default inject('myHomePageStore')(observer(AlertList));
