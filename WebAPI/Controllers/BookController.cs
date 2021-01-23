﻿using Newtonsoft.Json;
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
            var books = db.book.ToList();
            var list = JsonConvert.SerializeObject(books,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            var obj = Request.CreateResponse(HttpStatusCode.OK, books, Configuration.Formatters.JsonFormatter);
            return list;

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
