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

import br.com.alura.loja.modelo.Projeto;
import br.com.alura.loja.server.Servidor;

/*
 * Explicações
 * @Before: Tudo que roda antes dos testes iniciarem 
 * @After: Tudo que roda depois dos testes
 * @Test: Testes
 * */

public class ProjetosTest
{
	// Dados do servidor 
	HttpServer server;
	
	@Before
	public void antesDoTeste()
	{
		// Inicia servidor antes dos testes
		server = Servidor.startaServer();
	}
	
	@After
	public void depoisDoTeste()
	{
		// Para servidor depois dos testes
		server.stop();
	}
	
	@Test
	public void testProjetoIsOK()
	{
		// Instancia um cliente
		Client client = ClientBuilder.newClient();

		// Cria um target, uma url
		WebTarget target = client.target("http://localhost:8080/");

		// Seta o caminho do target
		String conteudo = target.path("/projetos/1").request().get(String.class);

		// Verifica se o resultado da get request contem a string
		//Assert.assertTrue(conteudo.contains("<nome>Minha"));

		// Cria um objeto de projeto a partir do XML
		Projeto projeto = (Projeto) new XStream().fromXML(conteudo);
		
		// Verifica se o getId() é igual a 1
		Assert.assertEquals(1, projeto.getId());
		
		
		/* Efetua o teste do método adiciona (post) */
		Projeto p = new Projeto();
		p.setNome("Teste Método Adiciona por POST");
		p.setAnoDeInicio(2016);
		String xml = p.toXML();
		
		// Representa o objeto como um xml
		Entity<String> entity = Entity.entity(xml, MediaType.APPLICATION_XML);

		// Faz a requisição para o teste
		Response response = target.path("/projetos").request().post(entity);
		
		// Verifica no XML se retornou Success (não eh o melhor jeito de se fazer, usar status code)
		//Assert.assertEquals("<status>Success</status>", response.readEntity(String.class));
		
		// Verifica se o status code de retorno é 201(created)
		Assert.assertEquals(201, response.getStatus());	

	}
}
