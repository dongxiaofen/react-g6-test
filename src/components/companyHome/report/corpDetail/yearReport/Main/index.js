import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
// import styles from './index.less';
@observer
export default class Main extends Component {
  static propTypes = {
    yearReportList: PropTypes.object,
    isLoading: PropTypes.bool,
  }
  render() {
    const content = (
      <div>
        <BaseInfo
          yearReportList={corpDetailStore.yearReportList}
          yearReportTab={corpDetailStore.yearReportTab}
          isLoading={isLoading} />
        <Website
          yearReportList={corpDetailStore.yearReportList}
          yearReportTab={corpDetailStore.yearReportTab}
          isLoading={isLoading} />
        <Investor
          yearReportList={corpDetailStore.yearReportList}
          yearReportTab={corpDetailStore.yearReportTab}
          isLoading={isLoading} />
        <AssetsInfo
          yearReportList={corpDetailStore.yearReportList}
          yearReportTab={corpDetailStore.yearReportTab}
          isLoading={isLoading} />
        <ShareAlter
          yearReportList={corpDetailStore.yearReportList}
          yearReportTab={corpDetailStore.yearReportTab}
          isLoading={isLoading} />
        <ChangeRecord
          yearReportList={corpDetailStore.yearReportList}
          yearReportTab={corpDetailStore.yearReportTab}
          isLoading={isLoading} />
      </div>
    );
    return (
      <div>
        {content}
      </div>
    );
  }
}
