package br.com.alura.loja.server;

import java.io.IOException;
import java.net.URI;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

/*
 * Cria um servidor Grizzly, compatível com JAX-RS e servlet api
 * 
 * */

public class Servidor
{
	public static void main(String[] args) throws IOException
	{
		HttpServer server = startaServer();

		// Roda o servidor até ter algum input na console
		System.out.println("Servidor rodando");
	    System.in.read();
	    server.stop();
	}

	public static HttpServer startaServer()
	{
		// Define a uri do server baseada no localhost, porta 8080:
		URI uri = URI.create("http://localhost:8080/");
		
		// Define a config do server baseada em todas as classes do pacote loja
		ResourceConfig config = new ResourceConfig().packages("br.com.alura.loja");

		// Cria o server
		HttpServer server = GrizzlyHttpServerFactory.createHttpServer(uri, config);
		
		return server;
	}
}
