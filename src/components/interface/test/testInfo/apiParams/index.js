import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import InfoItem from '../item';
import Input from 'components/lib/input';
import {Row, Col} from 'components/common/layout';
import styles from './index.less';

function ApiParams({interfaceTestStore}) {
  const handleInput = (evt) => {
    const id = evt.target.id;
    const value = evt.target.value;
    interfaceTestStore.updateValue(`apiParams.${id}`, value);
  };
  const createParams = () => {
    const apiParams = interfaceTestStore.interfaceInfo.data.apiParams;
    if (apiParams) {
      return apiParams.map((item) => {
        return (<Col width="6" key={item}><InfoItem title={item + ':'} cssName={styles['params-item']}>
          <Input
            type="text"
            id={item}
            className={styles['param-input']}
            value={interfaceTestStore.apiParams[item]}
            onChange={handleInput}/>
        </InfoItem></Col>);
      });
    }
  };
  return (
    <div>
      {
        interfaceTestStore.interfaceInfo.data.apiParams && interfaceTestStore.interfaceInfo.data.apiParams.length > 0 ?
        <div className={styles.params}>
          <p className={styles.title}>API参数</p>
          <Row>
            {createParams()}
          </Row>
        </div> : null
      }
    </div>
  );
}

ApiParams.propTypes = {
  interfaceTestStore: PropTypes.object,
};
export default inject('interfaceTestStore')(observer(ApiParams));
