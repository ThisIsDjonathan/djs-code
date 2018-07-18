package drk.itauscraper;

import java.io.IOException;
import java.net.MalformedURLException;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;
//import static spark.Spark.*;
//import java.util.Scanner;


/**
 *
 * @author Djonathan Krause
 */
public class MainApp
{

    public static final String ITAU_LINK = "https://ww70.itau.com.br/M/";

    public static void main(String[] args) throws MalformedURLException, NoSuchAlgorithmException
    {
        try
        {
            Login login = new Login();
            
            // Informar dados abaixo
            login.doLogin("", "", "", "");
            
            
        } catch (Exception ex)
        {
            Logger.getLogger(MainApp.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
    
    
/* 
    public void loginSpark()
    {
        // Spark Webservice
        get("/doLogin/:agency/:accountNumber/:accountDigit/:password", (request, response) -> {
            return login.doLogin(request.params(":agency"), request.params(":accountNumber"), request.params(":accountDigit"), request.params(":password")).toString();
            });
    }
*/
}
