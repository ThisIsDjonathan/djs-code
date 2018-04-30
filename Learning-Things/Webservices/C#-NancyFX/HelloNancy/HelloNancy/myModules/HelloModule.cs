
// Imports
using Nancy;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System;

/*
	- Os módulos definem o comportamento das aplicações Nancy;
	- O Nancy escaneia todos os módulos e cacheia depois, não é custoso e os módulos são globais;
	- Utiliza HTTP, suporta DELETE, GET, HEAD, OPTIONS, POST, PUT e PATCH;
    - O DynamicDictionary permite acessar os valores como index ou propriedade (ver em ProductsModule)
*/
namespace HelloNancy
{
    // Classe Hello World que é um modulo do NanfyFX
    public class HelloModule : NancyModule
    {
        // Contrutor
        public HelloModule()
        {
            // No root do servidor (localhost/) vai printar um Hello World
            Get["/"] = parameters => "Hello World";

            // No caminho '/meuTeste' vai printar o parâmetro informado
            Get["/meuTeste"] = parameters => "Teste funcionou!";
        }
    }


}