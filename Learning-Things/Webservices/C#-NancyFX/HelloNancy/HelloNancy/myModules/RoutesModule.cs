using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HelloNancy
{
    public class RoutesModule : NancyModule
    {
        public RoutesModule()
        {
            // Pega rotas como '/rotas/nancy' enviadas como uma GET request
            Get["/rotaString/{name}"] = parameters => 
            {
                return "Rotas: " + parameters.name;
            };

            // Pega rotas como '/favoriteNumber/1234', mas não '/favoriteNumber/asdf'. Só valores int
            Get["/rotaInt/{value:int}"] = parameters => 
            {
                return "Número: " + parameters.value;
            };   
        }
    }
}
