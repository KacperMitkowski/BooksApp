using BooksApp.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class BookController : ApiController
    {
        private KMdbEntities db = new KMdbEntities();
        // GET api/book
        public string Get()
        {
            var credentials = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
            if (credentials != null)
            {
                var loggedAuthor = credentials.Split('=')[0];
                var token = credentials.Split('=')[1];

                string authorFromToken = JWTHelper.ValidateToken(token);
                if (authorFromToken != null && loggedAuthor == authorFromToken)
                {
                    var authorBooks = JsonConvert.SerializeObject(db.author.Where(x => x.login == authorFromToken).FirstOrDefault().book.ToList(),
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                    return authorBooks;
                }
            }

            return null;

        }

        // GET api/book/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/book
        public void Post([FromBody] string value)
        {
        }

        // PUT api/book/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/book/5
        public void Delete(int id)
        {
        }
    }
}
