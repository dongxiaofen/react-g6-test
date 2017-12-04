export const javaText = `
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
    import java.security.MessageDigest;
    import java.security.NoSuchAlgorithmException;
    import java.security.cert.X509Certificate;
    import java.util.HashMap;
    import java.util.Map;

    public class Demo {
        private static final String APIKEY = "5abc************zo1e";
        private static final String SHARED_SECRET = "AB%S********************************i5UN";

        public static void main(String[] args) throws UnsupportedEncodingException, URISyntaxException {
            httpGetDemo();
            httpPostDemo();
        }

        private static void httpGetDemo() throws UnsupportedEncodingException, URISyntaxException {
            // 1. 获取SSL的client实例
            CloseableHttpClient httpClient = createSSLClientDefault();

            // 2. 创建httpGet实例
            URI url = new URI("https://business.socialcredits.cn/api/external/enterprise/name/match?enterpriseName="
                    + URLEncoder.encode("有限公司", "UTF-8"));
            HttpGet get = new HttpGet(url);

            try {
                // 3. 组装apiToken，并加密
                String timestamp = System.currentTimeMillis() + "";
                String apiToken = get.getMethod().toLowerCase() + SHARED_SECRET + timestamp + get.getURI().getPath()
                        + get.getURI().getRawQuery();
                String encryptedToken = SHA_256(apiToken);

                // 4. 设置请求头
                get.addHeader("Content-Type", "application/json");
                get.addHeader("Accept-Charset", "utf-8");
                get.addHeader("sc-apikey", APIKEY);
                get.addHeader("sc-timestamp", timestamp);
                get.addHeader("sc-api-token", encryptedToken);

                // 5. 发送请求
                CloseableHttpResponse response = httpClient.execute(get);

                // 6. 在这里处理返回值
                System.out.println("response status:" + response.getStatusLine().getStatusCode());
                System.out.println("response data:" + EntityUtils.toString(response.getEntity()));
            } catch (IOException | NoSuchAlgorithmException e) {
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
            URI url = new URI("https://business.socialcredits.cn/api/external/person/validation/base2");
            HttpPost post = new HttpPost(url);

            try {
                // 3. 组装apiToken，并加密
                String timestamp = System.currentTimeMillis() + "";
                String apiToken = post.getMethod().toLowerCase() + SHARED_SECRET + timestamp + post.getURI().getPath();
                String encryptedToken = SHA_256(apiToken);

                // 4. 设置请求头
                post.addHeader("Accept-Charset", "utf-8");
                post.addHeader("Content-Type", "application/json");
                post.addHeader("sc-apikey", APIKEY);
                post.addHeader("sc-timestamp", timestamp);
                post.addHeader("sc-api-token", encryptedToken);

                // 5. 将参数设置到entity对象中
                Map<String, Object> body = new HashMap<>();
                body.put("idCard", "500223198801014444");
                body.put("name", "张三");
                StringEntity se = new StringEntity(JSONObject.valueToString(body));
                se.setContentType("text/json");
                se.setContentEncoding(new BasicHeader("Content-Type", "application/json"));

                // 6. 将entity对象设置到httpPost对象中
                post.setEntity(se);

                // 7. 发送请求
                CloseableHttpResponse response = httpClient.execute(post);

                // 8. 在这里处理返回值
                System.out.println("response status:" + response.getStatusLine().getStatusCode());
                System.out.println("response data:" + EntityUtils.toString(response.getEntity()));
            } catch (IOException | NoSuchAlgorithmException e) {
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

        }
    }
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
