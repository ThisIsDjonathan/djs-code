/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.spark;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import static spark.Spark.*;
import spark.route.RouteOverview;

/**
 * @author Djonathan
 */
public class HelloWorld
{

    public static void main(String[] args)
    {
        // Roda o server até ter algum input 
        try
        {
            // Printa "Hello World" na rout /hello
            get("/hello", (req, res) -> "Hello World");

            // Imprime "Hello" concatenado com a string inputada na route
            get("/hello/:name", (request, response)
                    -> 
                    {
                        return "Hello " + request.params(":name");
            });

            // Coringas podem ser usados nas rotas
            get("/say/*/to/*", (request, response) -> 
                    {
                        return "numero de coringas: " + request.splat().length;
            });
            
            // Mostra as rotas mapeadas
            RouteOverview.enableRouteOverview("/rotasMapeadas"); 
            
            // Para server
            System.in.read();
            stop();
        } catch (IOException ex)
        {
            Logger.getLogger(HelloWorld.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
