import { observable, action } from 'mobx';
import detailModalStore from '../detailModal';
class AlertAnalysisStore {
  @observable detailData = {}
  @action.bound openDetailModal() {
    detailModalStore.openDetailModal((cp)=>{
      require.ensure([], (require)=>{
        cp(
          require('components/companyHome/report/AlertAnalysis/detail/Info'),
          require('components/companyHome/report/AlertAnalysis/detail/Content')
        );
      });
    });
  }
}
export default new AlertAnalysisStore();
