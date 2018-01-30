import { observable, action } from 'mobx';
// import { clientApi } from 'api';

class HeaderStore {
  @observable currentNav = 'interface';
  // @observable innerCurrentNav = 'introduce';
  @observable navList = [
    {
      key: 'interface',
      label: '接口中心',
      children: [
        {name: '接口介绍', value: 'introduce', active: true},
        {name: '接口测试', value: 'test', active: false},
      ]
    }, {
      key: 'consume',
      label: '消费中心',
      children: [
        {name: '消费订单', value: 'consumption', active: true},
        {name: '充值记录', value: 'recharge', active: false},
      ]
    }, {
      key: 'account',
      label: '个人中心',
      children: [
        {name: '修改密码', value: 'modify', active: true},
        {name: '安全隐私', value: 'safe', active: false},
        {name: '我的接口', value: 'myapi', active: false},
      ]
    },
  ];

  @action.bound navChange(data) {
    this.currentNav = data;
  }

  @action.bound innerNavChange(data, childIdx, parentIdx) {
    const pIdx = parentIdx ? parentIdx : this.navList.findIndex(item => (item.key === this.currentNav));
    const cIdx = childIdx ? childIdx : this.navList[pIdx].children.findIndex(item => item.value === data);
    const newNav = [];
    this.navList[pIdx].children.map((item, idx) => {
      if (idx === cIdx || (cIdx === -1 && idx === 0)) {
        newNav.push({name: item.name, value: item.value, active: true});
      } else {
        newNav.push({name: item.name, value: item.value, active: false});
      }
    });
    this.navList[pIdx].children = newNav;
  }
  @action.bound routeChangeNav(pathname) {
    const path = pathname === '/' ? '/v2/introduce' : pathname;
    const pathArr = path.split('/');
    // console.log(pathArr);
    const innerNavData = pathArr[2];
    let pNavData;
    this.navList.map((item) => {
      item.children.map((child) => {
        if (child.value === innerNavData) {
          pNavData = item.key;
        }
      });
    });
    this.navChange(pNavData);
    this.innerNavChange(innerNavData);
  }
}
export default new HeaderStore();
