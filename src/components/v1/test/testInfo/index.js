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

function TestInfo({interfaceTestStore, pageType, modalStore}) {
  const infoData = interfaceTestStore.interfaceInfo.data;
  // let isOpenApikey = false;
  const handleShowApikey = () => {
    interfaceTestStore.updateValue('isOpenApikey', !interfaceTestStore.isOpenApikey);
  };
  const handleTest = () => {
    if (pageType === 'all') {
      // console.log('all');
      let isTest = false;
      const myInterface = interfaceTestStore.myInterface;
      Object.keys(myInterface).map((key) => {
        myInterface[key].map((item) => {
          if (item.id === interfaceTestStore.id) {
            isTest = true;
          }
        });
      });
      if (isTest) {
        interfaceTestStore.interfaceTest();
      } else {
        modalStore.openCompModal({
          isSingleBtn: true,
          contentText: '您未开通该接口，请联系商务人员，我们会立即为你办理，联系电话：400-139-1819，邮箱：info@socialcredits.cn',
          confirmAction: modalStore.closeAction
          // cancelAction: closeAction
        });
      }
    } else {
      interfaceTestStore.interfaceTest();
    }
  };
  return (
    <div className={styles.info}>
      <div>
        {
          pageType === 'single' ?
          <div className={styles.list}>
            <InfoItem title="接口名称：">
              <span>{infoData.name}</span>
            </InfoItem>
          </div> : null
        }

        <div className={`clearfix ${styles.list}`}>
          <InfoItem title="请求方式：" cssName={styles.method}>
            <span>{infoData.method}</span>
          </InfoItem>
          <InfoItem title="返回格式：" cssName={styles.rule}>
            <span>JSON</span>
          </InfoItem>
        </div>

        <div className={styles.list}>
          <InfoItem title="APIKEY：">
            <span>
              {interfaceTestStore.apiKey.apikey ?
                <span>
                  <span className={styles.apikey}>{interfaceTestStore.isOpenApikey ? interfaceTestStore.apiKey.apikey : shieldInfo(interfaceTestStore.apiKey.apikey)}</span>
                  <span className={styles['key-btn']} onClick={handleShowApikey}>
                    {/* <img src={openImg} /> */}
                    {interfaceTestStore.isOpenApikey ? <i className="fa fa-eye" aria-hidden="true"></i> : <i className="fa fa-eye-slash" aria-hidden="true"></i>}
                    {interfaceTestStore.isOpenApikey ? '隐藏key' : '显示key'}
                  </span>
                </span> : ''}
            </span>
          </InfoItem>
        </div>

        <div className={styles.list}>
          <InfoItem title="API介绍：">
            <Link className={styles.detail} to={`/v1/detail?id=${interfaceTestStore.id}`}>点击查看介绍</Link>
          </InfoItem>
        </div>
      </div>
      <ApiParams />
      <div>
        <Button btnType="primary" loading={interfaceTestStore.isResultLoading} className={styles['test-btn']} onClick={handleTest}>开始测试</Button>
      </div>
    </div>
  );
}

TestInfo.propTypes = {
  interfaceTestStore: PropTypes.object,
  modalStore: PropTypes.object,
  pageType: PropTypes.string,
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
})(inject('interfaceTestStore', 'modalStore')(observer(TestInfo)));
