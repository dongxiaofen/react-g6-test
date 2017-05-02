const testData = [
  {
    'id': 12324,
    'ruleDescription': '根据裁判文书判断，该公司是否被银行等金融机构起诉。',
    'time': '2016-09-07 00:00:00',
    'ruleName': '该企业被列为失信被执行名单',
    'ruleId': 1234,
    'companyName': '湖北亿龙源食品有限公司',
    'detailSummary': [],
    'detail': [
      {
        'eventTime': '2016-09-07',
        'type': 'judgeInfo',
        'id': '4b95e6b9-5e39-403f-a455-876582c51a88'
      }
    ],
  },

  {
    'id': 12324,
    'ruleDescription': '判断该企业是否有失信被执行信息',
    'time': '2016-09-07 00:00:00',
    'ruleName': '该企业关联公司被银行等金融机构起诉',
    'ruleId': 1234,
    'companyName': '湖北亿龙源食品有限公司',
    'detailSummary': [],
    'detail': [
      {
        'eventTime': '2016-09-07',
        'type': 'judgeInfo',
        'id': '4b95e6b9-5e39-403f-a455-876582c51a88',
        'companyName': '××公司',
        'relation': ['对外投资', '股东']
      }
    ],
  }
];
export default testData;
