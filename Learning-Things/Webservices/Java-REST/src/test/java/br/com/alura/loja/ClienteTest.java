package br.com.alura.loja;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.grizzly.http.server.HttpServer;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import com.thoughtworks.xstream.XStream;

import br.com.alura.loja.modelo.Carrinho;
import br.com.alura.loja.modelo.Produto;
import br.com.alura.loja.server.Servidor;


/* Explicações
 * @Before: Tudo que roda antes dos testes iniciarem 
 * @After: Tudo que roda depois dos testes
 * @Test: Testes
 * */

public class ClienteTest
{
	// Variavel que armazena servidor
	HttpServer server; 
	
	@Before
	public void startaServer()
	{
		// Inicia servidor
		server = Servidor.startaServer();
	}
	
	@After
	public void mataServer()
	{
		// Para servidor
		server.stop();
	}
	
	@Test
	public void testaQueBuscarUmCarrinhoTrazOCarrinhoEsperado()
	{
		//instancia um cliente
		Client client = ClientBuilder.newClient();

		//Cria um target, uma url
		WebTarget target = client.target("http://localhost:8080/");
		
		//Seta o caminho do target
		String conteudo = target.path("/carrinhos/1").request().get(String.class);

		//Verifica se o resultado da get request contem a string
		Assert.assertTrue(conteudo.contains("<rua>Rua Vergueiro 3185"));
		
		// Cria um objeto de carrinho a partir do XML de retorno
		Carrinho carrinho = (Carrinho) new XStream().fromXML(conteudo);
		
		// Verifica se o getRua() do carrinho é igual a String abaixo
		Assert.assertEquals("Rua Vergueiro 3185, 8 andar", carrinho.getRua());
		
		/* Efetua o teste do método adiciona (post) */
		Carrinho c = new Carrinho();
		c.adiciona(new Produto(111L, "Produto de teste", 222, 3));
		String xml = c.toXML();
		
		// Representa o objeto como um xml
		Entity<String> entity = Entity.entity(xml, MediaType.APPLICATION_XML);

		// Faz a requisição para o teste
		Response response = target.path("/carrinhos").request().post(entity);
		
		// Verifica se retorno Success
		//Assert.assertEquals("<status>sucesso</status>", response.readEntity(String.class));
		
		// Verifica se o retorno foi o status code 201, que representa created
		Assert.assertEquals(201, response.getStatus());
		
		// Pega a URI do carrinho 
		String location = response.getHeaderString("Location");
		System.out.println(location);
		
		
	}
}
