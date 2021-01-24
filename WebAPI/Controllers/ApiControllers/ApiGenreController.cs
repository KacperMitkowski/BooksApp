using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers.ApiControllers
{
    public class ApiGenreController : ApiController
    {
        private KMdbEntities db = new KMdbEntities();
        // GET api/apiGenre
        public string Get()
        {
            var genres = JsonConvert.SerializeObject(db.genre.ToList(),
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

            return genres;
        }

    }
}