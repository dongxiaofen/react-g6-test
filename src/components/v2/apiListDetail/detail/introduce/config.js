export const demo = `
  import com.google.gson.Gson;
  import org.apache.http.client.methods.CloseableHttpResponse;
  import org.apache.http.client.methods.HttpPost;
  import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
  import org.apache.http.conn.ssl.SSLContextBuilder;
  import org.apache.http.conn.ssl.TrustStrategy;
  import org.apache.http.entity.StringEntity;
  import org.apache.http.impl.client.CloseableHttpClient;
  import org.apache.http.impl.client.HttpClients;
  import org.apache.http.message.BasicHeader;
  import org.apache.http.util.EntityUtils;
  import org.json.JSONObject;
  import javax.net.ssl.SSLContext;
  import java.io.IOException;
  import java.net.URI;
  import java.security.KeyManagementException;
  import java.security.KeyStoreException;
  import java.security.NoSuchAlgorithmException;
  import java.security.cert.X509Certificate;
  import java.util.HashMap;
  import java.util.Map;

  public class TokenDemo {
  private static final String API_KEY = "你的apikey";
  private static final String SHARED_SECRET = "你的密钥";
  private static final String BASE_URL = "https://business.socialcredits.cn";

  public static void main(String[] args) throws Exception {
      getApiToken();
  }

  private static String getApiToken() throws Exception {
      // 1. 获取SSL的client实例
      CloseableHttpClient httpClient = createSSLClientDefault();
      // 2. 创建httpPost实例
      URI url = new URI(BASE_URL + "api/v2/sc/token");
      HttpPost post = new HttpPost(url);
      try {
          // 3. 设置请求头
          post.addHeader("Accept-Charset", "utf-8");
          post.addHeader("Content-Type", "application/json");

          // 4. 将参数设置到entity对象中
          Map<String, Object> body = new HashMap<>();
          body.put("searedSecret", SHARED_SECRET);
          body.put("apiKey", API_KEY);
          StringEntity se = new StringEntity(new JSONObject(body).toString(), "UTF-8");
          se.setContentType("text/json");
          se.setContentEncoding(new BasicHeader("Content-Type", "application/json"));

          // 5. 将entity对象设置到httpPost对象中
          post.setEntity(se);

          // 6. 发送请求
          CloseableHttpResponse response = httpClient.execute(post);

          // 7. 在这里处理返回值
          Map data = new Gson().fromJson(EntityUtils.toString(response.getEntity()), Map.class);
          System.out.println("response status:" + response.getStatusLine().getStatusCode());
          System.out.println("response data:" + data);
          return (String) ((Map) data.get("data")).get("sc-api-token");
      } catch (Exception e) {
          e.printStackTrace();
      } finally {
          try {
              httpClient.close();
          } catch (IOException e) {
              e.printStackTrace();
          }
      }
      return null;
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
  }
  }
`;

export const example = `
  import com.google.gson.Gson;
  import org.apache.http.Header;
  import org.apache.http.client.methods.CloseableHttpResponse;
  import org.apache.http.client.methods.HttpGet;
  import org.apache.http.client.methods.HttpPost;
  import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
  import org.apache.http.conn.ssl.SSLContextBuilder;
  import org.apache.http.conn.ssl.TrustStrategy;
  import org.apache.http.entity.StringEntity;
  import org.apache.http.impl.client.CloseableHttpClient;
  import org.apache.http.impl.client.HttpClients;
  import org.apache.http.message.BasicHeader;
  import org.apache.http.util.EntityUtils;
  import org.json.JSONObject;
  import javax.net.ssl.SSLContext;
  import java.io.IOException;
  import java.io.UnsupportedEncodingException;
  import java.net.URI;
  import java.net.URISyntaxException;
  import java.net.URLEncoder;
  import java.security.KeyManagementException;
  import java.security.KeyStoreException;
  import java.security.NoSuchAlgorithmException;
  import java.security.cert.X509Certificate;
  import java.util.HashMap;
  import java.util.Map;

  public class Demo {
      private static final String API_KEY = "你的apikey";
      private static final String SHARED_SECRET = "你的密钥";
      private static final String BASE_URL = "https://business.socialcredits.cn";

      public static void main(String[] args) throws Exception {
          httpGetDemo();
          httpPostDemo();
      }

      private static String getApiToken() throws Exception {
          // 1. 获取SSL的client实例
          CloseableHttpClient httpClient = createSSLClientDefault();
          // 2. 创建httpPost实例
          URI url = new URI(BASE_URL + "/api/v2/sc/token");
          HttpPost post = new HttpPost(url);
          try {
              // 3. 设置请求头
              post.addHeader("Accept-Charset", "utf-8");
              post.addHeader("Content-Type", "application/json");

              // 4. 将参数设置到entity对象中
              Map<String, Object> body = new HashMap<>();
              body.put("sharedSecret", SHARED_SECRET);
              body.put("apiKey", API_KEY);
              StringEntity se = new StringEntity(new JSONObject(body).toString(), "UTF-8");
              se.setContentType("text/json");
              se.setContentEncoding(new BasicHeader("Content-Type", "application/json"));

              // 5. 将entity对象设置到httpPost对象中
              post.setEntity(se);

              // 6. 发送请求
              CloseableHttpResponse response = httpClient.execute(post);

              // 7. 在这里处理返回值
              Map data = new Gson().fromJson(EntityUtils.toString(response.getEntity()), Map.class);
              System.out.println("response status:" + response.getStatusLine().getStatusCode());
              System.out.println("response data:" + data);
              return (String) ((Map) data.get("data")).get("sc-api-token");
          } catch (Exception e) {
              e.printStackTrace();
          } finally {
              try {
                  httpClient.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
          return null;
      }

      private static void httpGetDemo() throws UnsupportedEncodingException, URISyntaxException {
          // 1. 获取SSL的client实例
          CloseableHttpClient httpClient = createSSLClientDefault();

          // 2. 创建httpGet实例
          URI url = new URI(BASE_URL + "/api/external/bizInfo/tax/check?companyName="
                  + URLEncoder.encode("有限公司", "UTF-8"));
          HttpGet get = new HttpGet(url);

          try {
              // 3. 获取token
              String token = getApiToken();

              // 4. 设置请求头
              get.addHeader("Content-Type", "application/json");
              get.addHeader("Accept-Charset", "utf-8");
              get.addHeader("sc-api-token", token);

              // 5. 发送请求
              CloseableHttpResponse response = httpClient.execute(get);

              // 6. 在这里处理返回值
              System.out.println("response status:" + response.getStatusLine().getStatusCode());
              System.out.println("response data:" + EntityUtils.toString(response.getEntity()));
              System.out.println("response header:");
              Header[] allHeaders = response.getAllHeaders();
              for (int i = 0; i < allHeaders.length; i++) {
                  System.out.println(allHeaders[i].getName() + ":" + allHeaders[i].getValue());
              }
          } catch (Exception e) {
              e.printStackTrace();
          } finally {
              try {
                  httpClient.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
      }

      private static void httpPostDemo() throws URISyntaxException {
          // 1. 获取SSL的client实例
          CloseableHttpClient httpClient = createSSLClientDefault();

          // 2. 创建httpPost实例
          URI url = new URI(BASE_URL + "/api/external/person/validation/base2");
          HttpPost post = new HttpPost(url);

          try {
              // 3. 获取token
              String token = getApiToken();

              // 4. 设置请求头
              post.addHeader("Accept-Charset", "utf-8");
              post.addHeader("Content-Type", "application/json");
              post.addHeader("sc-api-token", token);

              // 5. 将参数设置到entity对象中
              Map<String, Object> body = new HashMap<>();
              body.put("idCard", "500223198801014444");
              body.put("name", "张三");
              StringEntity se = new StringEntity(new JSONObject(body).toString(), "UTF-8");
              se.setContentType("text/json");
              se.setContentEncoding(new BasicHeader("Content-Type", "application/json"));

              // 6. 将entity对象设置到httpPost对象中
              post.setEntity(se);

              // 7. 发送请求
              CloseableHttpResponse response = httpClient.execute(post);

              // 8. 在这里处理返回值
              System.out.println("response status:" + response.getStatusLine().getStatusCode());
              System.out.println("response data:" + EntityUtils.toString(response.getEntity()));
          } catch (Exception e) {
              e.printStackTrace();
          } finally {
              try {
                  httpClient.close();
              } catch (IOException e) {
                  e.printStackTrace();
              }
          }
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
      }
  }
`;

export const headerDataSource = [
  {key: 'Limit', header: 'X-RateLimit-Limit', value: '每小时调用次数限制'},
  {key: 'Remaining', header: 'X-RateLimit-Remaining', value: '剩余调用次数限制'},
  {key: 'Reset', header: 'X-RateLimit-Reset', value: '次数重置的时间，unix 时间戳'},
];
export const headerColumns = [
  {title: 'header', dataIndex: 'header', key: 'header'},
  {title: '说明', dataIndex: 'value', key: 'value'},
];
