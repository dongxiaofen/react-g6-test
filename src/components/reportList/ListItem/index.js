import React from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Row, Col } from 'components/common/layout';
import styles from './index.less';
function ListItem({data, listType}) {
  const viewReport = (companyName) => {
    browserHistory.push(`/companyHome?companyName=${companyName}`);
  };
  return (
    <Row className={styles.item}>
      <Col width="6">
        <div className={styles.nameWrap}>
          <span
            className={styles.name}
            title={data.companyName}
            onClick={viewReport.bind(null, data.companyName)}>
            {data.companyName}
          </span>
        </div>
        <div className={styles.infoDetail}>
          <span className={styles.detailItem}>{`法人：${data.frName ? data.frName : '无'}`}</span>
          <span
            className={styles.detailItem}
            title={data.address ? data.address : '无'}>
            {`地址：${data.address ? data.address : '无'}`}
          </span>
        </div>
      </Col>
      <Col width="2">
        <div className={styles.typeKey}>报告类型</div>
        <div className={styles.typeValue}>{listType === 'basic' ? '基础' : '高级'}报告</div>
      </Col>
      <Col width="4">
        <div className="clearfix">
          <div className={styles.lastModifiedTs}>
            <div className={styles.timeValue}>{data.lastModifiedTs}</div>
            <div className={styles.timeKey}>最近刷新日期</div>
          </div>
          <div className={styles.createdTs}>
            <div className={styles.timeValue}>{data.createdTs}</div>
            <div className={styles.timeKey}>创建报告日期</div>
          </div>
          <div className={styles.anTime}>
            <div className={styles.timeValue}>{data.analysisCount}</div>
            <div className={styles.timeKey}>刷新次数</div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default observer(ListItem);
