import { observable, action } from 'mobx';
import { accountProfileApi } from 'api';

class AccountProfileStore {
  @observable a = 4;
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
