import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import PdfTitle from 'components/common/pdf/PdfTitle';
import RegisterInfo from '../Base/Info/RegisterInfo';
import ShareHolder from '../Base/Info/ShareHolder';
import PersonListData from '../Base/Info/PersonListData';
import FiliationList from '../Base/Info/FiliationList';
import Enterprise from '../Base/Foreign/Enterprise';
import Investment from '../Base/Foreign/Investment';
import Office from '../Base/Foreign/Office';
import AlterAnalysis from '../Base/Alter/AlterAnalysis';
import AlterList from '../Base/Alter/AlterList';
import YearReportList from '../Base/YearReport/YearReportList';


function Base({ judgeIsModuleExist }) {
  return (
    <div>
      {
        judgeIsModuleExist('CORP_BASIC')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="工商基本信息" />
            <RegisterInfo {...this.props} />
            <ShareHolder {...this.props} />
            <PersonListData {...this.props} />
            <FiliationList {...this.props} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_INV_POS')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="对外投资任职" />
            <Enterprise {...this.props} />
            <Investment {...this.props} />
            <Office {...this.props} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_ALTER')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="工商变更" />
            <AlterAnalysis {...this.props} />
            <AlterList {...this.props} />
          </div>
          :
          ''
      }
      {
        judgeIsModuleExist('CORP_YEAR_REPORT')
          ?
          <div>
            <PdfTitle module="基本信息" subModule="企业年报" />
            <YearReportList {...this.props} />
          </div>
          :
          ''
      }
    </div>
  );
}

Base.propTypes = {
  judgeIsModuleExist: PropTypes.func,
};
export default observer(Base);
