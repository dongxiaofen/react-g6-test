import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Highlight from 'react-fast-highlight';
// import Table from 'components/common/Table';
import styles from './index.less';
import { javaText } from './config';
@observer
export default class Introduce extends Component {
  componentDidMount() {
    // window.hljs.initHighlightingOnLoad();
  }
  render() {
    return (
      <div className={styles.introduce}>
        <div>
          <div className={styles.box}>
            <h1>1. API概述</h1>
            <p className={styles.pcontent}>所有API都是使用https请求调用，请求域名: <a href="https://business.socialcredits.cn">https://business.socialcredits.cn</a></p>
            <p className={styles.pcontent}>请求调用流程:</p>
            <ol className={styles.list}>
              <li>1). 客户端需先调用身份验证令牌(token)的"授权API"</li>
              <li>2). "授权API"会返回一个身份验证令牌(token)</li>
              <li>3). 客户端使用获取的身份令牌(token)来调用业务API</li>
              <li>4). 业务API返回结果</li>
            </ol>
          </div>
          <div className={styles.box}>
            <h1>2. 认证方式</h1>
            <p className={styles.pcontent}>所有业务API的调用都将使用token验证。一个有效的API调用需要包含一个有效身份验证令牌(token，通过JWT生成)。</p>
          </div>
          {/*<div style={{width: '50%', marginBottom: '10px'}}>
            <Table dataSource={paramsDataSource} columns={paramsColumns}/>
          </div>*/}
          <p className={styles.pcontent}>sc-api-token生成规则:</p>
          <Highlight
            languages={['javascript']}
            className="my-class"
            >
            {`
              var s = [http method] + [sharedSecret] + [timestamp] + [API uri path] + [queryParam]
              var token = sha256Hex(s)
            `}
          </Highlight>
          <ol className={styles.list}>
            <li>参数追加过程不需要空格进行分割</li>
            <li>接口传输的所有参数使用 UTF8 编码</li>
            <li>API uri path 不包含协议和域名部分，也不包含查询参数。如：/api/external/enterprise/report</li>
            <li>使用SHA-256 hash，Hex encode</li>
            <li>http method 使用小写</li>
            <li>需要传递请求参数时，需要把参数部分也加入token生成。参数为原始查询数据字符串（中文需要urlencode）。 如：/api/external/user/customerLabels?externalId=xxxx&labels=eduction，则queryParam为：externalId=xxxx&labels=eduction</li>
            <li>POST body 部分不加校验范围，GET方式传输中文时，需要先进行UrlEncode。</li>
          </ol>
          <p className={styles.pcontent}>代码示例（java）</p>
          <Highlight
            languages={['java']}
            className="my-class"
            >
            {javaText}
          </Highlight>
        </div>
        <div>
          <h1>返回说明：</h1>
          <p className={styles.pcontent}>正确返回时,errorCode 为  200 , message为  success , data 字段里的内容是api返回的结果</p>
          <Highlight
            languages={['javascript']}
            className="my-class"
            >
            {`
              {
                  "errorCode": 200,
                  "message": "success",
                  "data": {
                      "OrganizationName": "重庆誉存大数据科技有限公司"
                  }
              }
            `}
          </Highlight>
          <p>错误返回时,errorCode 为错误码，message 为错误信息, 可以在全局错误码里查看, data为 null </p>
          <p>example:</p>
          <Highlight
            languages={['javascript']}
            className="my-class"
            >
            {`
              {
                  "errorCode": 400999,
                  "message": "param is incorrect",
                  "data": null
              }
            `}
          </Highlight>
        </div>
        <div>
          <h1>API 调用频率限制</h1>
          <p>每小时调用API的频率限制，默认是500, 如果不够请联系管理员</p>
          <p>可以通过API请求查看header:</p>
          <Highlight
            languages={['javascript']}
            className="my-class"
            >
            {`
              curl -i https://business.scialcredits.cn/api/v2/users/****
              HTTP/1.1 200 OK
              Date: Mon, 01 Jul 2013 17:27:06 GMT
              Status: 200 OK
              X-RateLimit-Limit: 60
              X-RateLimit-Remaining: 56
              X-RateLimit-Reset: 1372700873
            `}
          </Highlight>
          <p>Header 信息说明</p>
          {/*<div style={{width: '50%', marginBottom: '10px'}}>
            <Table dataSource={headerDataSource} columns={headerColumns}/>
          </div>*/}
        </div>
      </div>
    );
  }
}
