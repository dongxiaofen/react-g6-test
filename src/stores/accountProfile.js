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
    // this.getSubNewestRule();
    // this.getFrequentRule();
  }
  @action.bound getFrequentRule() {
    accountProfileApi.frequentRule()
      .then(action( (response) => {
        this.subFrequentRuleData = response.data;
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubNewestRule() {
    accountProfileApi.subNewestRule()
      .then(action( (response) => {
        this.subNewestRuleData = response.data;
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubAccount10() {
    accountProfileApi.subWorningAccount10()
      .then(action( (response) => {
        this.subAccount10Data = response.data;
      }))
      .catch(action( (err) => {
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
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubNewest() {
    accountProfileApi.subNewest()
      .then(action( (response) => {
        this.subWarningCompnay = response.data;
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getOwnHightRisk() {
    accountProfileApi.ownHightRisk()
      .then(action( (response) => {
        this.ownHighRisk = response.data;
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubHightRisk() {
    accountProfileApi.subHightRisk()
      .then(action( (response) => {
        this.subHighRisk = response.data;
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getOwnLowestScore() {
    accountProfileApi.ownLowestScore()
      .then(action( (response) => {
        this.ownLowestScore = response.data;
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

  @action.bound getSubLowestScore() {
    accountProfileApi.subLowestScore()
      .then(action( (response) => {
        this.subLowestScore = response.data;
      }))
      .catch(action( (err) => {
        console.log(err.response.data);
      }));
  }

}
export default new AccountProfileStore();
