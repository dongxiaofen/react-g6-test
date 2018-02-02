import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import InfoItem from '../item';
import Input from 'components/lib/input';
import {Row, Col} from 'components/common/layout';
import __trim from 'lodash/trim';
import styles from './index.less';

function ApiParams({apiTestStore}) {
  const handleInput = (evt) => {
    const id = evt.target.id;
    const value = __trim(evt.target.value);
    apiTestStore.updateValue(`apiParams.${id}.value`, value);
  };
  const createParams = () => {
    const apiParams = apiTestStore.apiParams;
    const paramsArr = Object.keys(apiParams);
    if (paramsArr.length > 0) {
      return paramsArr.map((item) => {
        return (<Col width="6" key={item}><InfoItem required={apiTestStore.apiParams[item].attribute === 'required'} title={item + ':'} cssName={styles['params-item']}>
          <Input
            type="text"
            id={item}
            className={styles['param-input']}
            value={apiTestStore.apiParams[item].value}
            onChange={handleInput}/>
        </InfoItem></Col>);
      });
    }
  };
  return (
    <div>
      {
        apiTestStore.apiInfo.params && apiTestStore.apiInfo.params.length > 0 ?
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
  apiTestStore: PropTypes.object,
};
export default inject('apiTestStore')(observer(ApiParams));
