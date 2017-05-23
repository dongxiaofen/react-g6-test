import { observable, action, reaction, runInAction } from 'mobx';
const helpInfo1 = '创建监控后，可查看该板块信息';
const helpInfo2 = '创建监控、报告后，可查看该板块信息';
class LeftBarStore {
  constructor() {
    reaction(
      () => this.activeItem,
      () => {
        this.setMenuByItem();
      }
    );
  }
  @observable activeMenu = [];
  @observable activeItem = '';
  barConf = [
    {
      menuText: '信息报告',
      menuKey: 'report',
      children: [
        {
          menuText: '企业基本信息',
          menuKey: 'corpDetail',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
        {
          menuText: '上市披露',
          menuKey: 'stock',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
        {
          menuText: '税务信息',
          menuKey: 'tax',
          helpInfo: helpInfo1,
          contain: ['monitor']
        },
        {
          menuText: '风险信息',
          menuKey: 'risk',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
        {
          menuText: '新闻信息',
          menuKey: 'internet',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
        {
          menuText: '经营信息',
          menuKey: 'assets',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
        {
          menuText: '团队信息',
          menuKey: 'team',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
      ],
      helpInfo: helpInfo2,
      contain: ['monitor', 'report'],
    },
    {
      menuText: '关联网络',
      menuKey: 'network',
      children: [
        // {
        //   menuText: '全网关系',
        //   menuKey: 'forceNetwork',
        //   helpInfo: helpInfo1,
        //   contain: ['deepMonitor', 'monitor']
        // },
        {
          menuText: '关联关系',
          menuKey: 'network',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
        {
          menuText: '风险关系', menuKey: 'blackNetwork',
          helpInfo: helpInfo2,
          contain: ['monitor', 'report']
        },
      ],
      helpInfo: helpInfo2,
      contain: ['monitor', 'report'],
    },
    {
      menuText: '趋势分析',
      menuKey: 'trendAnalyse',
      children: [
        {
          menuText: '事件时间轴',
          menuKey: 'timeAxis',
          helpInfo: helpInfo1,
          contain: ['monitor']
        },
        {
          menuText: '预警分析',
          menuKey: 'alertAnalysis',
          helpInfo: helpInfo1,
          contain: ['monitor']
        },
      ],
      helpInfo: helpInfo1,
      contain: ['monitor'],
    },
    {
      menuText: '信息核查',
      menuKey: 'infoCheck',
      children: [
        {
          menuText: '关联人核查',
          menuKey: 'relPerCheck',
          helpInfo: helpInfo1,
          contain: ['monitor']
        },
        {
          menuText: '税务核查',
          menuKey: 'taxCheck',
          helpInfo: helpInfo1,
          contain: ['monitor']
        },
      ],
      helpInfo: helpInfo1,
      contain: ['monitor'],
    },
    {
      menuText: '企业现勘',
      menuKey: 'corprationXk',
      children: [
        {
          menuText: '现勘记录',
          menuKey: 'nowRecord',
          helpInfo: helpInfo1,
          contain: ['monitor']
        },
      ],
      helpInfo: helpInfo1,
      contain: ['monitor'],
    },
  ];

  @action.bound setMenuByItem() {
    const barConf = this.barConf;
    barConf.forEach(item => {
      item.children.forEach(child => {
        if (child.menuKey === this.activeItem) {
          runInAction('切换报告runInAction一级目录', () => {
            if (!this.activeMenu.includes(item.menuKey)) {
              this.activeMenu.push(item.menuKey);
            }
          });
        }
      });
    });
  }
  @action.bound getReportType(routing) {
    const { monitorId, reportId} = routing.location.query;
    let reportType;
    if (monitorId) {
      reportType = 'monitor'; // 监控
    }
    if (reportId) {
      reportType = 'report'; // 报告
    }
    return reportType;
  }
  @action.bound resetStore() {
    this.activeMenu = ['report'];
    this.activeItem = 'corpDetail';
  }
  @action combineServerData(data) {
    this.activeItem = data.activeItem;
  }
}
export default new LeftBarStore();
