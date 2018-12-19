package br.com.alura.loja.modelo;

import com.google.gson.Gson;
import com.thoughtworks.xstream.XStream;


public class Projeto
{
	private String nome;
	private long id;
	private int anoDeInicio;

	// construtor
	public Projeto(long id, String nome, int anoDeInicio)
	{
		this.nome = nome;
		this.id = id;
		this.anoDeInicio = anoDeInicio;
	}

	// Construtor vazio
	public Projeto(){}
	
	// Transforma o objeto em XML
	public String toXML()
	{
		// Usa a biblioteca XStream para retornar o XML
		return new XStream().toXML(this);
	}
	
	// Transforma o objeto JAVA em Json
	public String toJson()
	{
		// Usa a biblioteda Gson para retornar um Json
		return new Gson().toJson(this);
	}
	
	// getters e setters
	public String getNome()
	{
		return nome;
	}

	public void setNome(String nome)
	{
		this.nome = nome;
	}

	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public int getAnoDeInicio()
	{
		return anoDeInicio;
	}

	public void setAnoDeInicio(int anoDeInicio)
	{
		this.anoDeInicio = anoDeInicio;
	}
}
