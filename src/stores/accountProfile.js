import { observable, action } from 'mobx';
import { accountProfileApi } from 'api';

class AccountProfileStore {
  @observable ownWarningStatisticsData = {
    'alertCompanyCount': 3,
    'alertCount': 33,
    'monitorCount': 33,
    'reportCount': 33
  };

  @observable subWarningStatisticsData = {
    'alertCompanyCount': 8,
    'alertCount': 30,
    'monitorCount': 30,
    'reportCount': 56
  };

  // 我的新增业务统计
  @observable myNewBusinessData = {};

  // 我的地域分布
  @observable myProvinceRank = {};

  // 我的行业分布
  @observable myIndustryDist = {};

  // 下属新增业务统计
  @observable subNewBusinessData = {};

  // 下属地域分布
  @observable subProvinceRank = {};

  // 下属行业分布
  @observable subIndustryDist = {};

  // 获取图表数据
  @action.bound getEchartsData() {
    this.getMyNewBusinessData();
    this.getMyProvinceRank();
    this.getMyIndustryDist();
    this.getSubNewBusinessData();
    this.getSubProvinceRank();
    this.getSubIndustryDist();
  }
  // 获取我的新增业务统计
  @action.bound getMyNewBusinessData() {
    accountProfileApi.getMyNewBusinessData()
      .then(action( (response) => {
        this.myNewBusinessData = response.data;
      }))
      .catch(action( (err) => {
        this.myNewBusinessData = {error: err.response.data};
      }));
  }
  // 获取我的地域分布
  @action.bound getMyProvinceRank() {
    accountProfileApi.getMyProvinceRank()
      .then(action( (response) => {
        this.myProvinceRank = response.data;
      }))
      .catch(action( (err) => {
        this.myProvinceRank = {error: err.response.data};
      }));
  }
  // 获取我的行业分布
  @action.bound getMyIndustryDist() {
    accountProfileApi.getMyIndustryDist()
      .then(action( (response) => {
        this.myIndustryDist = response.data;
      }))
      .catch(action( (err) => {
        this.myIndustryDist = {error: err.response.data};
      }));
  }
  // 获取下属新增业务统计
  @action.bound getSubNewBusinessData() {
    accountProfileApi.getSubNewBusinessData()
      .then(action( (response) => {
        this.subNewBusinessData = response.data;
      }))
      .catch(action( (err) => {
        this.subNewBusinessData = {error: err.response.data};
      }));
  }
  // 获取下属地域分布
  @action.bound getSubProvinceRank() {
    accountProfileApi.getSubProvinceRank()
      .then(action( (response) => {
        this.subProvinceRank = response.data;
      }))
      .catch(action( (err) => {
        this.subProvinceRank = {error: err.response.data};
      }));
  }
  // 获取下属行业分布
  @action.bound getSubIndustryDist() {
    accountProfileApi.getSubIndustryDist()
      .then(action( (response) => {
        this.subIndustryDist = response.data;
      }))
      .catch(action( (err) => {
        this.subIndustryDist = {error: err.response.data};
      }));
  }

  @action.bound getAcconutPageInfo() {
    this.getOwnWarningStatistics();
    this.getSubWarningStatistics();
    this.getOwnHightRisk();
    this.getSubHightRisk();
    this.getSubLowestScore();
    this.getOwnLowestScore();
    this.getOwnNewest();
    this.getSubNewest();
  }

  @action.bound getOwnWarningStatistics() {
    accountProfileApi.ownWarningStatistics()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubWarningStatistics() {
    accountProfileApi.subWarningStatistics()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getOwnNewest() {
    accountProfileApi.ownNewest()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubNewest() {
    accountProfileApi.subNewest()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getOwnHightRisk() {
    accountProfileApi.ownHightRisk()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubHightRisk() {
    accountProfileApi.subHightRisk()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getOwnLowestScore() {
    accountProfileApi.ownLowestScore()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubLowestScore() {
    accountProfileApi.subLowestScore()
      .then(action( (response) => {
        console.log(response.data);
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

}
export default new AccountProfileStore();
