# table

##　介绍
该table只是简单的表格，复杂的建议antd的表格

### 参数
dataSource: [{key,}]
columns: [{
  title,
  dataIndex,
  key,
  render: ((text, record, rowIndex) => {})
  }]

render: function(), text为当前项dataIndex值，record为当前项数据
