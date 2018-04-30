using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;

namespace HelloNancy.myModules
{
    public class Teste : NancyModule
    {
        public Teste()
        {
            Get["/teste"] = parameters => "teste";

        }
    }
}