using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;

namespace HelloNancy
{
    
    // Model Dinossauro
    public class Dinossauro
    {
        public string nome { get; set; }
        public int altura { get; set; }
        public string status { get; set; }
    }

    // Main
    public class DinossauroModule : NancyModule
    {
        // Lista de dinossauros
        List<Dinossauro> dinossauros = new List<Dinossauro>();

        // Cria um dinossauro
        Dinossauro dinossauroDiego = new Dinossauro()
        {
            nome = "Diego",
            altura = 0,
            status = "Vivo"
        };

        // Construtor
        public DinossauroModule()
        {
            // Verifica se o Dinossauro existe na lista
            Get["/dinossauro/{nome}"] = parameters =>
            {
                // Percorre a lista de Dinossauros
                for (int i = 0; i < dinossauros.Count; i++)
                {
                    // Se o parâmetro {nome} for igual ao dino[i] da lista
                    if (dinossauros[i].nome == parameters.nome)
                    {
                        return "Nome: " + parameters.nome;
                    }
                    else
                    {
                        return "Dinossauro " + parameters.nome + " nao encontrado";
                    }
                }

                return ".";                
            };

            // Add dinossauro na lista
            dinossauros.Add(dinossauroDiego);

            //Get["/dinossauro/diego"] = parameters => dinossauroDiego.nome;

        }
    }
}