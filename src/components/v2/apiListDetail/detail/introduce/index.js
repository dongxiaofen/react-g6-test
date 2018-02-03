import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Highlight from 'react-fast-highlight';
import Table from 'components/common/Table';
import styles from './index.less';
import { demo, example, headerDataSource, headerColumns } from './config';
@observer
export default class Introduce extends Component {
  componentDidMount() {
    // window.hljs.initHighlightingOnLoad();
  }
  render() {
    return (
      <div className={styles.introduce}>
        <div className={styles.box}>
          <h1>1. API概述</h1>
          <p>所有API都是使用https请求调用，请求域名: <a href="https://business.socialcredits.cn">https://business.socialcredits.cn</a></p>
          <p>请求调用流程:</p>
          <ol className={styles.list}>
            <li>1). 客户端需先调用身份验证令牌(token)的"授权API"</li>
            <li>2). "授权API"会返回一个身份验证令牌(token)</li>
            <li>3). 客户端使用获取的身份令牌(token)来调用业务API</li>
            <li>4). 业务API返回结果</li>
          </ol>
        </div>
        <div className={styles.box}>
          <h1>2. 认证方式</h1>
          <p>所有业务API的调用都将使用token验证。一个有效的API调用需要包含一个有效身份验证令牌(token，通过JWT生成)。</p>
          <h3>2.1. 客户端调用"获取授权API"获取Token的流程</h3>
          <ol className={styles.list}>
            <li>1). 客户端需要使用用户的[searedSecret]和[apiKey] 调用"获取授权API"获取token</li>
            <li>2). API网关收到请求后,后端服务会认证您的apiKey,通过后会生成一个token,并返回给您,您可凭此Token来调用"业务API"</li>
            <li>3). 客户端使用"获取授权API" 得到的Token来调用"业务API"</li>
          </ol>
          <p>注意: [searedSecret]和[apiKey]在接口平台 个人中心->安全隐私即可查看, token有效时间为5分钟</p>
          <h3>2.2. 身份验证令牌(token)获取</h3>
          <p>请求方式: POST</p>
          <p>Content-type: application/json;charset=UTF-8</p>
          <p>{`请求url: http://<接口地址>/api/v2/sc/token`}</p>
          <p>例如：　https://business.socialcredits.cn/api/v2/sc/token</p>
          <h3>2.3. 请求body</h3>
          <Highlight
            languages={['javascript']}
            className="my-class"
            >
            {`
              {
                "searedSecret":"你的密钥",
                "apiKey":"你的apiKey"
              }
            `}
          </Highlight>
          <h3>2.4. 返回结果</h3>
          <p>在成功调用后，API服务将返回以下JSON格式的sc-api-token：</p>
          <Highlight
            languages={['javascript']}
            className="my-class"
            >
            {`
              {
                "data": {
                  "sc-api-token":"******"
                },
                "errorCode":200,
                "message":"ok"
              }
            `}
          </Highlight>
          <h3>2.5. 使用token</h3>
          <p>所有业务api请求都必须带上sc-api-token,它必须添加在HTTP header中，然后请求业务API.</p>
          <p>{`"sc-api-token":<sc-api-token值>`}</p>
          <h3>２.6．获取示例</h3>
          <Highlight
            languages={['java']}
            className="my-class"
            >
            {demo}
          </Highlight>
        </div>
        <div className={styles.box}>
          <h1>3.业务api调用示例</h1>
          <Highlight
            languages={['java']}
            className="my-class"
            >
            {example}
          </Highlight>
          <h3>3.1　返回说明</h3>
          <p>正确返回时,errorCode 为 200 , message为 success , data 字段里的内容是api返回的结果</p>
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
          <p>错误返回时,errorCode 为错误码，message 为错误信息, 可以在全局错误码里查看, data为 null</p>
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
        <div className={styles.box}>
          <h1>4.　API 调用频率限制</h1>
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
          <h3>4.1　Header 信息说明</h3>
          <div style={{width: '50%', marginBottom: '10px'}}>
            <Table dataSource={headerDataSource} columns={headerColumns}/>
          </div>
        </div>
      </div>
    );
  }
}
