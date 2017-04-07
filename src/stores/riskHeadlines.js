import { observable, action } from 'mobx';
import {riskHeadlinesApi} from 'api';
import pathval from 'pathval';
import moment from 'moment';
// const getCurrDate = ()=> {
//   const date = new Date();
//   const seperator = '-';
//   const year = date.getFullYear();
//   let month = date.getMonth() + 1;
//   let strDate = date.getDate();
//   if (month >= 1 && month <= 9) {
//     month = '0' + month;
//   }
//   if (strDate >= 0 && strDate <= 9) {
//     strDate = '0' + strDate;
//   }
//   return year + seperator + month + seperator + strDate;
// };
// const currentdate = getCurrDate();
// const initState = {
//   filterParams: {
//     from: currentdate,
//     to: currentdate,
//     companyName: '',
//     dimGroupType: ['CORP', 'LEGAL', 'NEWS', 'OPERATION', 'TEAM', 'STOCK'],
//   },
//   filterConfig: [
//     {name: '工商', enumKey: 'CORP', checked: 1},
//     {name: '法务', enumKey: 'LEGAL', checked: 1},
//     {name: '新闻', enumKey: 'NEWS', checked: 1},
//     {name: '经营', enumKey: 'OPERATION', checked: 1},
//     {name: '团队', enumKey: 'TEAM', checked: 1},
//     {name: '上市', enumKey: 'STOCK', checked: 1},
//   ],
//   companyList: {
//     loading: true,
//     extend: {},
//     data: [],
//     subCompany: {},
//     active: '',
//   },
//   events: {
//     info: {},
//     data: [],
//     companyType: 'MAIN',
//     params: {
//       index: 1,
//       size: 10,
//       dimGroupType: '',
//     },
//     loading: {},
//   },
// };
const currentdate = moment();
class RiskHeadlinesStore {
  @observable filterParams = {
    from: currentdate,
    to: currentdate,
    companyName: '',
    dimGroupType: ['CORP', 'LEGAL', 'NEWS', 'OPERATION', 'TEAM', 'STOCK'],
  };
  @action.bound getCompanyList(dimGroupTypeStr, params) {
    riskHeadlinesApi.getCompanyList(dimGroupTypeStr, params)
    .then(action('getCompanyList'), (resp)=> {
      this.initState.companyList.data = resp.data;
    })
    .catch((err) => {
      console.log('getCompanyList', err.response);
    });
  }
  @action.bound riskUpdateValue(objName, keyPath, value) {
    pathval.setPathValue(this[objName], keyPath, value);
  }
}
export default new RiskHeadlinesStore();
