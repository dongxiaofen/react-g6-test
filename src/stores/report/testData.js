const testData = {
  'rule11': {
    'id': 12324,
    'ruleName': '较大比例关联公司发生工商注册资本变更',
    'ruleId': 11,
    'time': '2016-04-18 00:00:00',
    'companyName': '****影视文化传播有限公司',
    'ruleDescription': '检测该主体公司所有关联公司是否大部分(30%)都发生了注册资本变更',
    'detailSummary': [
      {
        'numOfNetworkComp': 10,
        'numOfRegCapChange': 6,
      }
    ],
    'detail': [
      {
        'relation': [
          '关联关系'
        ],
        'capChangeInfo': [
          {
            'eventTime': '2015-07-09',
            'altBe': 1020,
            'alterType': '注册资本',
            'altAf': 2000
          },
          {
            'eventTime': '2015-07-09',
            'altBe': 1020,
            'alterType': '注册资本',
            'altAf': 2000
          }
        ],
        'type': 'saicRegisteredCapitalChange',
        'companyName': '艺龙天成（北京）影视文化传播有限公司'
      },
      {
        'relation': [
          '关联关系',
          '投资关系'
        ],
        'capChangeInfo': [
          {
            'eventTime': '2015-07-09',
            'altBe': 1020,
            'alterType': '注册资本',
            'altAf': 2000
          }
        ],
        'type': 'saicRegisteredCapitalChange',
        'companyName': '**有限公司'
      }
    ]
  },
  'rule12': {
    'id': 12324,
    'ruleName': '较大比例关联公司发生工商状态注销',
    'ruleId': 12,
    'time': '2017-04-19 11:46:07',
    'companyName': '重庆小泉化工厂',
    'ruleDescription': '检测该主体公司所有关联公司是否大部分(10%)都发生了工商登记注销',
    'detail': [
      {
        'statusType': '注销',
        'relation': [
          '投资公司'
        ],
        'type': 'saicInfoCheck',
        'companyName': '重庆市巴南区南泉镇乡镇企业投资合作社',
      },
      {
        'statusType': '注销',
        'relation': [
          '投资公司',
          '**关系'
        ],
        'type': 'saicInfoCheck',
        'companyName': '重庆**公司'
      }
    ]
  },
  rule7: {
    'id': 12324,
    'ruleName': '较大比例关联公司涉诉',
    'companyName': '重庆市博恩科技（集团）有限公司',
    'ruleDescription': '该企业的关联公司大量有失信被执行记录或者在判决文书，法院公告，开庭公告中作为被告涉及金融借贷纠纷',
    'time': '2017-04-21 17:39:07',
    'ruleId': 7,
    'detailSummary': [
      {
        'numOfCompInvolved': 4,
        'numOfNetworkComp': 10,
      }
    ],
    'detail': [
      {
        'cases': [
          {
            'name': '财产损害赔偿纠纷',
            'value': 1
          },
          {
            'name': '服务合同纠纷',
            'value': 3
          },

          {
            'name': '失信被执行',
            'value': 10
          }
        ],
        'relation': [
          '投资公司',
          '高管对外投资',
          '高管对外任职'
        ],
        'companyName': '重庆易极付科技有限公司'
      },
      {
        'cases': [
          {
            'name': '民间借贷纠纷',
            'value': 1
          },
          {
            'name': '买卖合同纠纷',
            'value': 1
          }
        ],
        'relation': [
          '投资公司',
          '高管对外任职'
        ],
        'companyName': '重庆博恩富克医疗设备有限公司'
      },
      {
        'cases': [
          {
            'name': '广告合同纠纷',
            'value': 1
          },
          {
            'name': '著作权权属、侵权纠纷',
            'value': 4
          },
          {
            'name': '合同纠纷',
            'value': 2
          }
        ],
        'relation': [
          '投资公司',
          '高管对外任职'
        ],
        'companyName': '重庆猪八戒网络有限公司'
      },
      {
        'cases': [
          {
            'name': '借款合同纠纷',
            'value': 2
          }
        ],
        'relation': [
          '投资公司'
        ],
        'companyName': '重庆市中鸿小额贷款有限责任公司'
      }
    ],

  }
};
// const testData = [
//   {
//     'id': 12324,
//     'ruleDescription': '根据裁判文书判断，该公司是否被银行等金融机构起诉。',
//     'time': '2016-09-07 00:00:00',
//     'ruleName': '该企业被列为失信被执行名单',
//     'ruleId': 1234,
//     'companyName': '湖北亿龙源食品有限公司',
//     'detailSummary': [],
//     'detail': [
//       {
//         'eventTime': '2016-09-07',
//         'type': 'judgeInfo',
//         'id': '4b95e6b9-5e39-403f-a455-876582c51a88'
//       }
//     ],
//   },
//   {
//     'id': 12324,
//     'ruleDescription': '判断该企业是否有失信被执行信息',
//     'time': '2016-09-07 00:00:00',
//     'ruleName': '该企业关联公司被银行等金融机构起诉',
//     'ruleId': 1234,
//     'companyName': '湖北亿龙源食品有限公司',
//     'detailSummary': [],
//     'detail': [
//       {
//         'eventTime': '2016-09-07',
//         'type': 'judgeInfo',
//         'id': '4b95e6b9-5e39-403f-a455-876582c51a88',
//         'companyName': '××公司',
//         'relation': ['对外投资', '股东']
//       }
//     ],
//   },
//   {// 规程10弹窗６经营业务进入当前关注行业
//     'id': 12324,
//     'ruleName': '经营业务进入当前关注行业',
//     'ruleId': 10,
//     'time': '2016-04-18 00:00:00',
//     'companyName': '意商德宝（北京）泵业有限公司',
//     'ruleDescription': '检测工商经营范围变更中新增的经营内容涉及到当前关注行业(危险行业来自国家针对性政策涉及到的行业)',
//     'detailSummary': [],
//     'detail': [
//       {
//         'eventTime': '2010-08-30 00:00:00',
//         'altItem': '经营范围',
//         'altAf': '销售机械设备。（法律、行政法规、国务院决定禁止的，不得经营；法律、行政法规、国务院决定规定应经许可的，经审批机关批准并经工商行政管理机关登记注册后方可经营；法律、行政法规、国务院决定未规定许可的，自主选择经营项目开展经营活动。）',
//         'altBe': '法律、行政法规、国务院决定禁止的，不得经营；法律、行政法规、国务院决定规定应经许可的，经审批机关批准并经工商行政管理机关登记注册后方可经营；法律、行政法规、国务院决定未规定许可的，自主选择经营项目开展经营活动。',
//         'type': 'saicInfoChange',
//         'involedIndustryPolicy': [
//           {
//             'title': '国家危险废物名录',
//             'url': 'http://www.zhb.gov.cn/gkml/hbb/bl/201606/t20160621_354852.htm',
//             'createDate': '2016-06-14 00:00:00',
//             'results': ['需要加强管理的产业'],
//             'publishDate': '2016-06-14 00:00:00',
//             'number': '部令 第39号',
//             'source': ['环境保护部'],
//           },
//           {
//             'title': '国家危险废物名录',
//             'url': 'http://www.zhb.gov.cn/gkml/hbb/bl/201606/t20160621_354852.htm',
//             'createDate': '2016-06-14 00:00:00',
//             'results': ['需要加强管理的产业'],
//             'publishDate': '2016-06-14 00:00:00',
//             'number': '部令 第39号',
//             'source': ['环境保护部'],
//           }
//         ]
//       }
//     ]
//   },
//   {// 弹窗１０
//     'id': 12324,
//     'ruleId': 23,
//     'companyName': '浙江平湖市共联压铸厂',
//     'time': '2011-12-20 00:00:00',
//     'detailSummary': [
//       {
//         'numOfNetworkComp': 10,
//         'numOfCompInvolved': 6,
//       }
//     ],
//     'ruleDescription': '根据行业政策数据库判断国家近期是否发布过该公司所在行业发展有负面影响的文件',
//     'ruleName': '较大比例企业关联公司所涉及行业为需要加强管理的产业',
//     'detail': [
//       {
//
//         'relation': ['投资公司'],
//         'companyName': '梁平县融康彩印包装有限公司',
//         'policy': [
//           {
//             'title': '国家危险废物名录',
//             'url': 'http://www.zhb.gov.cn/gkml/hbb/bl/201606/t20160621_354852.htm',
//             'createDate': '2016-06-14',
//             'publishDate': '2016-06-14',
//             'number': '部令 第39号',
//             'source': ['环境保护部'],
//             'relation': ['投资公司'],
//             'companyName': '梁平县融康彩印包装有限公司',
//             'results': [
//               '较大比例企业关联公司所涉及行业为国家规划需要逐渐退出的产业',
//               '较大比例企业关联公司所涉及行业为需要整治的产业'
//             ],
//             'intersectionIndustry': ['废弃资源综合利用业']
//           },
//         ]
//       },
//       {
//
//         'relation': ['投资公司'],
//         'companyName': '梁平县融康彩印包装有限公司',
//         'policy': [
//           {
//             'title': '国家危险废物名录',
//             'url': 'http://www.zhb.gov.cn/gkml/hbb/bl/201606/t20160621_354852.htm',
//             'createDate': '2016-06-14',
//             'publishDate': '2016-06-14',
//             'number': '部令 第39号',
//             'source': ['环境保护部'],
//             'relation': ['投资公司'],
//             'companyName': '梁平县融康彩印包装有限公司',
//             'results': [
//               '较大比例企业关联公司所涉及行业为国家规划需要逐渐退出的产业',
//               '较大比例企业关联公司所涉及行业为需要整治的产业'
//             ],
//             'intersectionIndustry': ['废弃资源综合利用业']
//           },
//         ]
//       },
//     ]
//   },
// ];
export default testData;
