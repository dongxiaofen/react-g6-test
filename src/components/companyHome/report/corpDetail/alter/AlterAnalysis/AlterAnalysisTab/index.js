import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function AlterAnalysisTab({items}) {
  const array = [];
  if (items.length > 0) {
    items.map((obj, idx)=>{
      array.push(
        <tr key={`${idx}tr`} className={styles.tr}>
          <td key={`${idx}tdL`} className={styles.tdL}>{obj.name.replace(':', '')}</td>
          <td key={`${idx}tdR`} className={styles.tdR}>{obj.value}</td>
        </tr>
      );
    });
  }
  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        {array}
      </tbody>
    </table>
  );
}

AlterAnalysisTab.propTypes = {
  items: PropTypes.object.isRequired,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    module: props.module
  })
})(observer(AlterAnalysisTab));
