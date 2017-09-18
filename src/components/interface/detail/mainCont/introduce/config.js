export const javaText = `
  import org.apache.http.client.methods.CloseableHttpResponse;
  import org.apache.http.client.methods.HttpGet;
  import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
  import org.apache.http.conn.ssl.SSLContextBuilder;
  import org.apache.http.conn.ssl.TrustStrategy;
  import org.apache.http.impl.client.CloseableHttpClient;
  import org.apache.http.impl.client.HttpClients;

  import javax.net.ssl.SSLContext;
  import java.io.IOException;
  import java.io.UnsupportedEncodingException;
  import java.net.URI;
  import java.net.URISyntaxException;
  import java.net.URLEncoder;
  import java.security.KeyManagementException;
  import java.security.KeyStoreException;
  import java.security.MessageDigest;
  import java.security.NoSuchAlgorithmException;
  import java.security.cert.X509Certificate;

  /**
   * Created by tiger on 15-12-22.
   */
  public class SdkHttpClientTest {
      private static final String APIKEY = "6fi*********lc9qfk";
      private static final String SHARED_SECRET = "4-dXc****************l8tN3Z";

      public static void main(String[] args) throws UnsupportedEncodingException, URISyntaxException {
          CloseableHttpClient httpClient = createSSLClientDefault();
          URI url = new URI("https://business.socialcredits.cn/api/external/enterprise/info/base?enterpriseName="
                  + URLEncoder.encode("杭州誉存科技有限公司", "UTF-8"));
          HttpGet get = new HttpGet(url);
          try {
              get.addHeader("Content-Type", "application/json");
              get.addHeader("Accept-Charset", "utf-8");

              String timestamp = System.currentTimeMillis() / 1000L + "";
              String apiToken = get.getMethod().toLowerCase() + SHARED_SECRET + timestamp + get.getURI().getPath()
               + get.getURI().getRawQuery();
              System.out.println("apitoken= " + apiToken);
              get.addHeader("sc-apikey", APIKEY);
              get.addHeader("sc-timestamp", timestamp);
              get.addHeader("sc-api-token", SHA_256(apiToken));

              CloseableHttpResponse response = httpClient.execute(get);
              // 在这里处理返回值

          } catch (IOException e) {
              e.printStackTrace();
          } catch (NoSuchAlgorithmException e) {
              e.printStackTrace();
          }
      }


      /**
       * 对输入字符串做sha 256 加密
       *
       * @param inputStr 输入的字符串
       * @return 返回加密成功的字符串
       */
      public static String SHA_256(String inputStr) throws NoSuchAlgorithmException {
          MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
          byte[] result = messageDigest.digest(inputStr.getBytes());
          StringBuilder sb = new StringBuilder();
          for (int i = 0; i < result.length; i++) {
              sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
          }
          return sb.toString();
      }

      /**
       * 添加证书信任
       */
      public static CloseableHttpClient createSSLClientDefault() {
          try {
              SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
                  //信任所有
                  public boolean isTrusted(X509Certificate[] chain, String authType) {
                      return true;
                  }
              }).build();

              SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext);
              return HttpClients.custom().setSSLSocketFactory(sslsf).build();
          } catch (KeyManagementException e) {
              e.printStackTrace();
          } catch (NoSuchAlgorithmException e) {
              e.printStackTrace();
          } catch (KeyStoreException e) {
              e.printStackTrace();
          }
          return HttpClients.createDefault();
  `;

export const paramsDataSource = [
  {key: 'content', header: 'Content-Type', value: 'application/json'},
  {key: 'apikey', header: 'sc-apikey', value: '[apikey]'},
  {key: 'timestamp', header: 'sc-timestamp', value: '[UTC从1970.01.00到现在的秒数]'},
  {key: 'token', header: 'sc-api-token', value: '[根据参数生成的TOKEN]'},
];
export const paramsColumns = [
  {title: 'header', dataIndex: 'header', key: 'header'},
  {title: '说明', dataIndex: 'value', key: 'value'},
];

export const headerDataSource = [
  {key: 'Limit', header: 'X-RateLimit-Limit', value: '每小时调用次数限制'},
  {key: 'Remaining', header: 'X-RateLimit-Remaining', value: '剩余调用次数限制'},
  {key: 'Reset', header: 'X-RateLimit-Reset', value: '次数重置的时间，unix 时间戳'},
];
export const headerColumns = [
  {title: 'header', dataIndex: 'header', key: 'header'},
  {title: '说明', dataIndex: 'value', key: 'value'},
];
