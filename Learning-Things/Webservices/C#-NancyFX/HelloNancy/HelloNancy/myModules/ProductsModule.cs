using System;
using Nancy;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HelloNancy
{
    public class ProductsModule : NancyModule
    {
        // Construtor
        public ProductsModule()
        {
            // Acessa o produto com id x de modo síncrono usando uma lambda expression '= _ =>'
            Get["products/{id}"] = _ =>
            {
                return "Produto do id informado";
            };

            // Pega o valor como se fosse uma propriedade
            Get["/propriedade/{name}"] = parameters => 
            {
                return "Valor usando propriedade: " + parameters.name;
            };

            // Pega o valor usando indices
            Get["/index/{name}"] = parameters => 
            {
                return "Valor usando index mode: " + parameters["name"];
            };


        }
    }
} 