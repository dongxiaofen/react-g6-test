import { observable, action } from 'mobx';
import { accountProfileApi } from 'api';

class AccountProfileStore {
  @observable ownWarningStatisticsData = {};

  @observable subWarningStatisticsData = {};


  @observable ownWarningCompnay = {};
  @observable subWarningCompnay = {};

  @observable ownHighRisk = {};
  @observable subHighRisk = {};

  @observable ownLowestScore = {};
  @observable subLowestScore = {};

  @observable subAccount10Data = {};
  @observable subNewestRuleData = {};
  @observable subFrequentRuleData = {};

  // 加载状态
  @observable ownWarningCompnayIsLoading = true;
  @observable ownRiskCompnayIsLoading = true;
  @observable ownLowScoreCompnayIsLoading = true;

  @observable subWarningCompnayIsLoading = true;
  @observable subRiskCompnayIsLoading = true;
  @observable subLowScoreCompnayIsLoading = true;

  @observable newAccount10IsLoading = true;

  // 规则loading
  @observable subFrequentRuleIsloading = true;
  @observable subNewestRuleIsLoading = true;
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
  @action.bound getAcconutPageInfo() {
    this.getOwnWarningStatistics();
    this.getSubWarningStatistics();
    this.getOwnHightRisk();
    this.getSubHightRisk();
    this.getSubLowestScore();
    this.getOwnLowestScore();
    this.getOwnNewest();
    this.getSubNewest();
    this.getSubAccount10();
    this.getSubNewestRule();
    this.getFrequentRule();
  }
  @action.bound getFrequentRule() {
    accountProfileApi.frequentRule()
      .then(action( (response) => {
        this.subFrequentRuleData = response;
        this.subFrequentRuleIsloading = false;
      }))
      .catch(action( (err) => {
        this.subFrequentRuleIsloading = false;
        this.subFrequentRuleData = err.response.data;
      }));
  }

  @action.bound getSubNewestRule() {
    accountProfileApi.subNewestRule()
      .then(action( (response) => {
        this.subNewestRuleData = response;
        this.subNewestRuleIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subNewestRuleIsLoading = false;
        this.subNewestRuleData = err.response.data;
      }));
  }

  @action.bound getSubAccount10() {
    accountProfileApi.subWorningAccount10()
      .then(action( (response) => {
        this.subAccount10Data = response;
        this.newAccount10IsLoading = false;
      }))
      .catch(action( (err) => {
        this.newAccount10IsLoading = false;
        this.subAccount10Data = err.response.data;
      }));
  }

  @action.bound getOwnWarningStatistics() {
    accountProfileApi.ownWarningStatistics()
      .then(action( (response) => {
        this.ownWarningStatisticsData = response.data;
      }))
      .catch(action( (err) => {
        console.log(err);
      }));
  }

  @action.bound getSubWarningStatistics() {
    accountProfileApi.subWarningStatistics()
      .then(action( (response) => {
        this.subWarningStatisticsData = response.data;
      }))
      .catch(action( (err) => {
        console.log(err);
      }));
  }

  @action.bound getOwnNewest() {
    accountProfileApi.ownNewest()
      .then(action( (response) => {
        this.ownWarningCompnay = response;
        this.ownWarningCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.ownWarningCompnayIsLoading = false;
        this.ownWarningCompnay = err.response.data;
      }));
  }

  @action.bound getSubNewest() {
    accountProfileApi.subNewest()
      .then(action( (response) => {
        this.subWarningCompnay = response;
        this.subWarningCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subWarningCompnayIsLoading = false;
        this.subWarningCompnay = err.response.data;
      }));
  }

  @action.bound getOwnHightRisk() {
    accountProfileApi.ownHightRisk()
      .then(action( (response) => {
        this.ownHighRisk = response;
        this.ownRiskCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.ownRiskCompnayIsLoading = false;
        this.ownHighRisk = err.response.data;
      }));
  }

  @action.bound getSubHightRisk() {
    accountProfileApi.subHightRisk()
      .then(action( (response) => {
        this.subHighRisk = response;
        this.subRiskCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subRiskCompnayIsLoading = false;
        this.subHighRisk = err.response.data;
      }));
  }

  @action.bound getOwnLowestScore() {
    accountProfileApi.ownLowestScore()
      .then(action( (response) => {
        this.ownLowestScore = response;
        this.ownLowScoreCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.ownLowScoreCompnayIsLoading = false;
        this.ownLowestScore = err.response.data;
      }));
  }

  @action.bound getSubLowestScore() {
    accountProfileApi.subLowestScore()
      .then(action( (response) => {
        this.subLowestScore = response;
        this.subLowScoreCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subLowScoreCompnayIsLoading = false;
        this.subLowestScore = err.response.data;
      }));
  }

}
export default new AccountProfileStore();
