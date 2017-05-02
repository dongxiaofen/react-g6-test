import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import {Row, Col} from 'components/common/layout';
import { runInAction } from 'mobx';
import photo from 'imgs/personReport/photo.png';

function Banner({personReportStore, routing, params}) {
  const bannerInfo = personReportStore.reportData;
  const idCard = personReportStore.idCard;
  const getIdCard = ()=> {
    if (routing.location.query.monitorId === 'monitor') {
      personReportStore.getMonitorCardId(routing.location.query.monitorId, {personCheckId: params.personCheckId});
    } else {
      personReportStore.getReportCardId(routing.location.query.reportId, {personCheckId: params.personCheckId});
    }
  };
  const clickIdCard = () => {
    if (idCard === '') {
      getIdCard();
    } else {
      runInAction('清除id', () => {
        personReportStore.idCard = '';
      });
    }
  };
  const modifyIdcard = (value)=>{
    const newValue = idCard === '' ? value : idCard;
    return (
      <span>
        {newValue}
        <i className={idCard === '' ? styles.close : styles.open} onClick={clickIdCard}></i>
      </span>
    );
  };
  const modifyCrimeResponses = (valueObj) => {
    return (
      valueObj.caseTime && valueObj.caseTime.length > 0 ?
        <span>{valueObj.compared}<span className={styles.caseTime}>(案发时间：{valueObj.caseTime.join(',')})</span></span> :
        valueObj.compared
    );
  };
  const config = [
    {key: 'name', width: '6', name: '姓名'},
    {key: 'idCard', width: '6', name: '身份证号', handle: modifyIdcard},
    {key: 'companyName', width: '6', name: '所属企业'},
    {key: 'relationship', width: '6', name: '关联关系'},
    {key: 'crimeResponses', width: '12', name: '犯罪记录', handle: modifyCrimeResponses},
  ];
  const createContent = ()=> {
    const output = [];
    config.map((cigItem)=>{
      const value = bannerInfo[cigItem.key] || '无';
      output.push(
        <Col width={cigItem.width} key={cigItem.key} className={styles.col}>
          <span className={styles.key}>{cigItem.name}：</span>
          <span className={styles.value}>{cigItem.handle && bannerInfo[cigItem.key] ? cigItem.handle(bannerInfo[cigItem.key]) : value}</span>
        </Col>
      );
    });
    return output;
  };
  return (
    <div className={`${styles.wrap} clearfix`}>
      <img className={styles.photo} alt="身份证照片" src={bannerInfo.photo ? `data:image/jpg;base64,${bannerInfo.photo}` : photo} />
      <div className={styles.info}>
        <Row>
          {createContent()}
        </Row>
      </div>
    </div>
  );
}

Banner.propTypes = {
  foo: PropTypes.string,
};
export default observer(Banner);
