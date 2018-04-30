package drk.itauscraper;

import drk.itauscraper.MainApp;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 *
 * @author Djonathan
 */
public class Login
{

    public static final String LOGIN_URL = "https://ww70.itau.com.br/M/LoginPF.aspx";
    public static final String LOGIN_PREFIX = "LoginPF.aspx?";
    public static final int SESSION_ID_SIZE = 80;
    private static final String ENCODING = "UTF-8";

    public void fazLoginPORRA() throws ProtocolException, MalformedURLException, IOException
    {
        String html = doGET(getValidLoginURL());
        
    }

    /**
     * Login on Itaú mobile website.
     *
     * @param agency Itaú agency.
     * @param accountNumber Itaú account number.
     * @param accountDigit Itaú account digit.
     * @param password Itaú web password.
     * @return HttpResponse of login page.
     */
    public HttpResponse doLogin(String agency, String accountNumber, String accountDigit, String password) throws ProtocolException, IOException
    {
        // Get a valid url with session ID
        String validURL = this.getValidLoginURL();

        // Do a new GET to show input form //String requestData = doGET(validURL);
        // POST with user params
        HttpClient httpClient = HttpClientBuilder.create().setRedirectStrategy(new LaxRedirectStrategy()).build();
        HttpPost post = new HttpPost(validURL);

        // List data for HttpPost parameters
        List<NameValuePair> arguments = new ArrayList<>(3);
        arguments.add(new BasicNameValuePair("ctl00$ContentPlaceHolder1$txtAgenciaT", agency));
        arguments.add(new BasicNameValuePair("ctl00$ContentPlaceHolder1$txtContaT", accountNumber));
        arguments.add(new BasicNameValuePair("ctl00$ContentPlaceHolder1$txtDACT", accountDigit));
        arguments.add(new BasicNameValuePair("ctl00$ContentPlaceHolder1$txtPassT", password));
        arguments.add(new BasicNameValuePair("ctl00$ContentPlaceHolder1$btnLogInT.x", "0"));
        arguments.add(new BasicNameValuePair("ctl00$ContentPlaceHolder1$btnLogInT.y", "0"));
        arguments.add(new BasicNameValuePair("ctl00$hddAppTokenApp", ""));
        arguments.add(new BasicNameValuePair("ctl00$hddExisteApp", ""));
        arguments.add(new BasicNameValuePair("ctl00$hddExisteApp", ""));
        /*arguments.add(new BasicNameValuePair("_LASTFOCUS", ""));
        arguments.add(new BasicNameValuePair("_EVENTTARGET", ""));
        arguments.add(new BasicNameValuePair("_EVENTARGUMENT", ""));*/

        // Set header
        /*post.addHeader("User-Agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36");
        post.addHeader("Accept", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36");
        post.addHeader("Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4");
        post.addHeader("ORIGIN", "https://ww70.itau.com.br");
         */
        post.addHeader(HttpHeaders.USER_AGENT, "Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30");
        post.addHeader(HttpHeaders.ACCEPT, "text/html; charset=" + ENCODING);
        //post.addHeader(HttpHeaders.ACCEPT_CHARSET, ENCODING);
        //post.addHeader(HttpHeaders.CONNECTION, "keep-alive");
        post.addHeader(HttpHeaders.HOST, "ww70.itau.com.br");
        post.addHeader("ORIGIN", "https://ww70.itau.com.br");
        post.addHeader("Accept-Encoding", "gzip, deflate, br");

        // Do post
        try
        {
            post.setEntity(new UrlEncodedFormEntity(arguments));
            HttpResponse response = httpClient.execute(post);

            // Print out the response message
            System.out.println(EntityUtils.toString(response.getEntity()));
            System.out.println("\nResponse Status: " + response.getStatusLine().getStatusCode());
            
            return response;
        } catch (IOException e)
        {
            System.out.println(e);
            Logger.getLogger(Login.class.getName()).log(Level.SEVERE, null, e);
        }
        return null;
    }

    /**
     * Get a valid URL with session ID.
     *
     * @return String with a valid URL.
     */
    public String getValidLoginURL()
    {
        // Do get request to login url
        String response = doGET(LOGIN_URL);

        // Create a new String to search seassion ID
        String searchString = response.toString();

        // Get position of LoginPF.aspx? on searchString
        int loginPos = searchString.indexOf(LOGIN_PREFIX);

        // When found LOGIN_PREFIX on searchString, get ID (next 80 caracs)
        String seassionID = searchString.substring(loginPos, loginPos + SESSION_ID_SIZE);

        return MainApp.ITAU_LINK + seassionID;
    }

    /**
     * Do a GET request with URL param.
     *
     * @param URL String.
     * @return String with result of request.
     */
    public String doGET(String URL)
    {
        try
        {
            // Create URL
            URL url = new URL(URL);

            // Do GET request
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // Set header to get a mobile session
            conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36");
            conn.setRequestProperty("Accept", "text/html; charset=" + ENCODING);
            conn.setRequestProperty("Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4");

            // Get stream data
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer data = new StringBuffer();

            // Build data string
            while ((inputLine = in.readLine()) != null)
                data.append(inputLine);

            // Close conectaiion and input stream
            in.close();
            conn.disconnect();

            return data.toString();

        } catch (IOException ex)
        {
            Logger.getLogger(Login.class
                    .getName()).log(Level.SEVERE, null, ex);
        }

        return "Error on doGET() method.";
    }

}
