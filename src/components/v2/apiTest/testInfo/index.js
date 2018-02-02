import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { Link } from 'react-router';
import { loadingComp } from 'components/hoc';
import Button from 'components/lib/button';
import InfoItem from './item';
import ApiParams from './apiParams';
import styles from './index.less';
import {shieldInfo} from 'helpers/infoShield';
// import openImg from 'imgs/open.png';

function TestInfo({apiTestStore}) {
  const infoData = apiTestStore.apiInfo;
  const handleShowApikey = () => {
    apiTestStore.updateValue('isOpenApikey', !apiTestStore.isOpenApikey);
  };
  return (
    <div className={styles.info}>
      <div>
        <div className={styles.list}>
          <InfoItem title="接口类别：">
            <span>{infoData.classification}</span>
          </InfoItem>
        </div>
        <div className={styles.list}>
          <InfoItem title="接口名称：">
            <span>{infoData.name}</span>
          </InfoItem>
        </div>
        <div className={`clearfix ${styles.list}`}>
          <InfoItem title="请求方式：" cssName={styles.method}>
            <span>{infoData.method}</span>
          </InfoItem>
          <InfoItem title="返回格式：" cssName={styles.rule}>
            <span>JSON</span>
          </InfoItem>
        </div>
        <div className={styles.list}>
          <InfoItem title="请求URL">
            <span>{infoData.url}</span>
          </InfoItem>
        </div>

        <div className={styles.list}>
          <InfoItem title="APIKEY：">
            <span>
              {apiTestStore.apiKey.id ?
                <span>
                  <span className={styles.apikey}>{apiTestStore.isOpenApikey ? apiTestStore.apiKey.apikey : shieldInfo(apiTestStore.apiKey.apikey)}</span>
                  <span className={styles['key-btn']} onClick={handleShowApikey}>
                    {/* <img src={openImg} /> */}
                    {apiTestStore.isOpenApikey ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}
                    {apiTestStore.isOpenApikey ? '隐藏key' : '显示key'}
                  </span>
                </span> : ''}
            </span>
          </InfoItem>
        </div>

        <div className={styles.list}>
          <InfoItem title="API介绍：">
            <Link className={styles.detail} to={`/v2/detail?id=${apiTestStore.activeC2Id}&apiId=${apiTestStore.activeApiId}`}>点击查看介绍</Link>
          </InfoItem>
        </div>
      </div>
      <ApiParams />
      <div>
        <Button btnType="primary" loading={apiTestStore.isResultLoading} className={styles['test-btn']} onClick={apiTestStore.handleTestApi}>开始测试</Button>
      </div>
    </div>
  );
}

TestInfo.propTypes = {
  apiTestStore: PropTypes.object,
  // modalStore: PropTypes.object,
  // pageType: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 0,
    height: 400
  }),
})(inject('apiTestStore')(observer(TestInfo)));
