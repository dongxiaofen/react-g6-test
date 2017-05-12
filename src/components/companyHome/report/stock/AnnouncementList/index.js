import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { CardTable } from 'components/common/report/';
import Select from 'components/lib/Select';
const Option = Select.Option;
function AnnouncementList({
  routing,
  selectValue,
  setSelectValue,
  announcementTypes,
  announcementDatas,
  announcementDatasLoading,
  changeAnnouncement
}) {
  const _getAnnouncement = (stockType) => {
    const query = routing.location.query;
    const monitorId = query.monitorId;
    const reportId = query.reportId;
    const analysisReportId = query.analysisReportId;
    changeAnnouncement({ stockType, monitorId, reportId, analysisReportId });
    setSelectValue(stockType);
  };
  const selectOptionList = () => {
    const output = [];
    output.push(<Option key={0} value="">全部</Option>);
    announcementTypes.forEach((item, key) => {
      output.push(<Option key={key + 1} value={item.type}>{item.type}</Option>);
    });
    return output;
  };
  const handleClick = (title, obj) => {
    window.open(obj.baodaUrl);
  };
  const data = {
    meta: {
      title: {
        main: 'title',
        handleClick: handleClick
      },
      body: [
        { 'key': 'title', 'width': '12', },
        { 'key': 'type', 'width': '6', },
        { 'key': 'announcementTime', 'width': '6' },
      ],
      isExpand: false,
      dict: 'stockAnnouncement',
      cData: announcementDatas
    },
    isLoading: announcementDatasLoading,
    module: '公告列表',
    error: announcementDatas.length === 0
  };
  return (
    <div className="clearfix">
      <div className={`clearfix ${styles.select}`}>
        <div>公告类型：</div>
        <div>
          <Select onChange={_getAnnouncement} value={selectValue}>
            {selectOptionList()}
          </Select>
        </div>
      </div>
      <CardTable {...data} />
    </div>
  );
}

AnnouncementList.propTypes = {
  routing: PropTypes.object,
  selectValue: PropTypes.string,
  announcementTypes: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  changeAnnouncement: PropTypes.func,
  setSelectValue: PropTypes.func
};
export default observer(AnnouncementList);
