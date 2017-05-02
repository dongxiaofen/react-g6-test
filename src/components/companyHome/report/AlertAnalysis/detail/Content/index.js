import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
// import DetailTable from 'components/common/report/alertAnalysis/DetailTable';
import styles from './index.less';
import {Rule11, Rule12} from './module';
function Content({alertAnalysisStore}) {
  // const meta = {
  //   dict: 'rule32to50',
  //   body: [
  //     [{ 'key': 'companyName', colSpan: '1'}, { 'key': 'relation', colSpan: '1'}],
  //     [{ 'key': 'policy', colSpan: '2'}],
  //   ],
  //   items: detail,
  //   maxCols: 3,
  //   hasNumber: true,
  // };
  // const meta = {
  //   dict: 'rule11',
  //   body: [
  //     [{ 'key': 'companyName', colSpan: '1'}, { 'key': 'relation', colSpan: '2'}],
  //     [{ 'key': 'capChangeInfo', kids: [
  //       {key: 'altBe', colSpan: '1'},
  //       {key: 'altAf', colSpan: '1'},
  //       {key: 'eventTime', colSpan: '1'},
  //     ]
  //     }],
  //   ],
  //   maxCols: 3,
  //   items: detail,
  //   hasNumber: true,
  // };
  // const meta = {
  //   dict: 'rule12',
  //   body: [
  //     [{ 'key': 'detail', kids: [
  //       {key: 'companyName', colSpan: '1'},
  //       {key: 'relation', colSpan: '1'},
  //     ]
  //     }],
  //   ],
  //   maxCols: 2,
  //   items: detail,
  //   hasNumber: false,
  // };
  const createModule = () => {
    const detail = alertAnalysisStore.detailData.detail;
    console.log(detail.ruleId);
    switch (detail.ruleId) {
      case 11:
        return <Rule11 data={detail} />;
      case 12:
        return <Rule12 data={detail} />;
      default:
        return <div>12</div>;
    }
  };
  return (
    <div className={styles.wrap}>
      {createModule()}
    </div>
  );
}

Content.propTypes = {
  foo: PropTypes.string,
};
export default inject('alertAnalysisStore')(observer(Content));
