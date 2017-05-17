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

  @observable ownWarningCompnay = [];
  @observable subWarningCompnay = [];

  @observable ownHighRisk = [];
  @observable subHighRisk = [];

  @observable ownLowestScore = [];
  @observable subLowestScore = [];

  @observable subAccount10Data = [];
  @observable subNewestRuleData = [
    {
      'alertType': 'RULE',
      'count': 10,
      'ruleName': '张三',
      'ruleTime': '2017-05-15'
    },
    {
      'alertType': 'RULE',
      'count': 20,
      'ruleName': '阿虎',
      'ruleTime': '2017-05-15'
    }
  ];
  @observable subFrequentRuleData = [
    {
      'alertType': 'RULE',
      'count': 10,
      'ruleName': '张三',
      'ruleTime': '2017-05-15'
    },
    {
      'alertType': 'RULE',
      'count': 36,
      'ruleName': '李四',
      'ruleTime': '2017-05-15'
    }
  ];

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
        this.subFrequentRuleData = response.data;
        this.subFrequentRuleIsloading = false;
      }))
      .catch(action( (err) => {
        this.subFrequentRuleIsloading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getSubNewestRule() {
    accountProfileApi.subNewestRule()
      .then(action( (response) => {
        this.subNewestRuleData = response.data;
        this.subNewestRuleIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subNewestRuleIsLoading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getSubAccount10() {
    accountProfileApi.subWorningAccount10()
      .then(action( (response) => {
        this.subAccount10Data = response.data;
        this.newAccount10IsLoading = false;
      }))
      .catch(action( (err) => {
        this.newAccount10IsLoading = false;
        console.log(err.response.data);
      }));
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
        this.ownWarningCompnay = response.data;
        this.ownWarningCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.ownWarningCompnayIsLoading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getSubNewest() {
    accountProfileApi.subNewest()
      .then(action( (response) => {
        this.subWarningCompnay = response.data;
        this.subWarningCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subWarningCompnayIsLoading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getOwnHightRisk() {
    accountProfileApi.ownHightRisk()
      .then(action( (response) => {
        this.ownHighRisk = response.data;
        this.ownRiskCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.ownRiskCompnayIsLoading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getSubHightRisk() {
    accountProfileApi.subHightRisk()
      .then(action( (response) => {
        this.subHighRisk = response.data;
        this.subRiskCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subRiskCompnayIsLoading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getOwnLowestScore() {
    accountProfileApi.ownLowestScore()
      .then(action( (response) => {
        this.ownLowestScore = response.data;
        this.ownLowScoreCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.ownLowScoreCompnayIsLoading = false;
        console.log(err.response.data);
      }));
  }

  @action.bound getSubLowestScore() {
    accountProfileApi.subLowestScore()
      .then(action( (response) => {
        this.subLowestScore = response.data;
        this.subLowScoreCompnayIsLoading = false;
      }))
      .catch(action( (err) => {
        this.subLowScoreCompnayIsLoading = false;
        console.log(err.response.data);
      }));
  }

}
export default new AccountProfileStore();
