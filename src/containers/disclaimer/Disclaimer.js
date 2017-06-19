import React, {Component} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';
import {Container, Row, Col} from 'components/common/layout';
import ProtocolNavbar from 'components/common/ProtocolNavbar';
import AppName from 'components/common/AppName';

@observer
export default class Disclaimer extends Component {
  render() {
    return (
      <div className={styles.bg}>
        <ProtocolNavbar />
        <Container>
          <Row>
            <Col>
              <div className={`clearfix ${styles.wrap}`}>
                <h2>免责申明</h2>
                <h3>第一条：</h3>
                <p><AppName/>基于互联网的相关服务（以下简称“网络服务”）的所有权和运作权归重庆誉存大数据科技有限公司所有。<AppName/>提供的网络服务将按照发布的服务协议执行。用户（包括注册用户和非注册用户）必须完全同意所有服务条款，才能成为<AppName/>的正式用户。
                </p>
                <h3>第二条：</h3>
                <p><AppName/>有权在必要时修改服务条款，<AppName/>服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的网络服务。如果用户继续享用网络服务，则视为接受服务条款的变动。<AppName/>保留随时修改或中断免费服务而不需告知用户的权利。<AppName/>行使修改或中断免费服务的权利，不需对用户或第三方负责。
                </p>
                <h3>第三条：</h3>
                <p>尊重用户个人隐私是<AppName/>的一项基本政策。<AppName/>对收集的涉及个人身份以及个人隐私的电子信息严格保密，不泄露、篡改、毁损，不出售或者非法向他人提供，除非合法用户授权或有法律许可要求或<AppName/>在诚信的基础上认为透露这些信件在以下四种情况是必要的：
                </p>
                <p>(a)遵守有关法律规定，遵从<AppName/>合法服务程序。</p>
                <p>(b)维护<AppName/>的商标所有权。</p>
                <p>(c)在紧急情况下竭力维护用户个人和社会大众的隐私安全。</p>
                <p>(d)符合其他相关的要求。</p>
                <h3>第四条：</h3>
                <p>用户个人对网络服务的使用承担风险。<AppName/>对此不作任何类型的担保，不论是明确的或隐含的。<AppName/>不担保服务一定能满足用户的要求，也不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保。
                </p>
                <h3>第五条：</h3>
                <p><AppName/>对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害可能来自：不正当使用网络服务，在网上购买商品或进行同类型服务，在网上进行交易，非法使用网络服务或用户传送的信息有所变动。这些行为都有可能会导致<AppName/>的形象受损，所以<AppName/>事先提出这种损害的可能性。此外，为了网站的正常运行，<AppName/>需要定期或不定期地对网站进行停机维护，因此类情况而造成的正常服务中断，请您予以理解。
                  <AppName/>将尽力避免服务中断或将中断时间限制在最短时间内。如因不可抗力或其他无法控制的原因，使<AppName/>在线购买系统崩溃或无法正常使用，导致您在<AppName/>购物无法完成或丢失有关的信息、记录等，<AppName/>不承担责任。但是<AppName/>会尽合理的可能协助处理善后事宜，并努力使您免受经济损失。
                </p>
                <h3>第六条：</h3>
                <p><AppName/>有判定用户行为是否符合风险监控平台服务条款要求的权利，如果用户违背了服务条款的规定，<AppName/>有中断对其提供网络服务的权利。</p>
                <h3>第七条：</h3>
                <p>用户同意保障和维护<AppName/>及其关联方及其他用户的正当利益，负责支付由用户使用超出服务范围引起的诉讼费用，违反服务条款的损害补偿费用等。</p>
                <h3>第八条：</h3>
                <p>用户或<AppName/>可随时根据实际情况中断一项或多项网络服务。风险监控平台不需对任何个人或第三方负责而随时中断服务。用户对后来的条款修改有异议，或对<AppName/>的服务不满，可以行使如下权利：
                </p>
                <p>(a)停止使用<AppName/>的网络服务。</p>
                <p>(b)通告<AppName/>停止对该用户的服务。</p>
                <p>结束用户服务后，用户使用网络服务的权利马上中止。从那时起，用户没有权利，<AppName/>也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。</p>
                <h3>第九条：</h3>
                <p>所有发给用户的通告都可通过重要页面的公告或电子邮件或常规的信件传送。服务条款的修改、服务变更、或其它重要事件的通告都会以此形式进行。</p>
                <h3>第十条：</h3>
                <p><AppName/>定义的网络服务内容包括：文字、终端、声音、图片、图表中的全部内容；电子邮件的全部内容；<AppName/>为用户提供的其他信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，用户只能在<AppName/>授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。任何人需要转<AppName/>的文章，必须征得<AppName/>明确授权。
                </p>
                <h3>第十一条：</h3>
                <p><AppName/>研发的所有终端产品均是计算机技术数据分析整合系统，终端内各种技术指标、图表、数据及提示信息等所有内容仅供参考，不应成为使用人作出决策的依据，使用人如据此操作，风险自担，本公司不承担任何经济和法律责任；<AppName/>（包含各微博微信客户端等）页面展示信息的目的在于提供参考信息，与本网站立场无关。<AppName/>不保证该信息(包括但不限于文字、数据及图表)全部或者部分内容的准确性、真实性、完整性、有效性、及时性、原创性等。相关信息并未经过本网站证实，不对您构成任何投资建议，据此操作，风险自担。
                </p>
                <h3>第十二条：</h3>
                <p>如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向重庆誉存大数据科技有限公司注册地所在的人民法院提起诉讼。</p>
                <h3>第十三条：</h3>
                <p>
                  本网站所呈现的所有资料及图表仅供参考使用。这些资料及图表并不构成对任何公司或平台持有任何意图。参阅本网站上所呈现的资料及图表的用户，应被视为已确认得悉上述立场。投资者依据本网站提供的信息、资料及图表进行各项投资项目所造成的盈亏与本网站无关。</p>
                <h3>第十四条：</h3>
                <p>
                  本网站的用户在参加网站举办的各种活动时，我们将在您的同意及确认下，通过注册表格等形式要求您提供一些个人资料，如：您的姓名、性别、年龄、出生日期、身份证号、家庭住址、教育程度、公司情况、所属行业等。我们在未经您同意的情况下，不会将您的任何资料以任何方式泄露给任何第三方。</p>
                <h3>第十五条：</h3>
                <p>当政府司法机关依照法定程序要求本网站披露个人资料时，我们将根据执法单位之要求或为公共安全之目的提供个人资料。在此情况下之任何披露，本网站均得免责。</p>
                <h3>第十六条：</h3>
                <p>由于用户将个人密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露，本网站不负任何责任。</p>
                <h3>第十七条：</h3>
                <p>任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等，本网站及时采取补救措施后，本网站均得免责。</p>
                <h3>第十八条：</h3>
                <p>由于与本网站链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果，本网站均得免责。</p>
                <h3>第十九条：</h3>
                <p>本网站如因系统维护或升级而需暂停服务，或因线路及非本公司控制范围外的硬件故障或其它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本网站不负任何责任。</p>
                <h3>第二十条：</h3>
                <p>
                  本网站发现法律、法规禁止发布或者传输的信息的，将立即停止传输该信息，采取消除等处置措施，保存有关记录，并有权向有关主管部门报告，除此之外，本网站使用者因为违反本声明的规定而触犯中华人民共和国法律的，一切后果自己负责，本网站不承担任何责任。</p>
                <h3>第二十一条：</h3>
                <p>凡以任何方式登录本网站或直接、间接使用本网站资料者，视为自愿接受本网站声明的约束。</p>
                <h3>第二十二条：</h3>
                <p>本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。</p>
                <h3>第二十三条：</h3>
                <p>本公司的信息来源为公开的网页信息，仅供参考，本公司的的参考信息不得作为法律证据使用，如需相应的证据，请至相应披露该信息的网站获取。</p>
                <h3>第二十四条：</h3>
                <p>本网站之声明以及其修改权、更新权及最终解释权均属<AppName/>所有。</p>
                <p className={styles.end}>重庆誉存大数据科技有限公司</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
