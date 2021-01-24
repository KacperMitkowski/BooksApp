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
    public class ApiBookController : ApiController
    {
        private KMdbEntities db = new KMdbEntities();
        // GET api/apiBook
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

        // GET api/apiBook/5
        public string Get(int id)
        {

            return "value";
        }

        // POST api/book
        public void Post(string value)
        {
        }

        // PUT api/book/5
        public bool Put(book book)
        {
            try
            {
                if (book == null || book.book_id == 0 || string.IsNullOrWhiteSpace(book.title) || string.IsNullOrWhiteSpace(book.description) || string.IsNullOrWhiteSpace(book.publication_date.ToString()) || string.IsNullOrWhiteSpace(book.isbn))
                {
                    return false;
                }
                var bookFromDb = db.book.FirstOrDefault(x => x.book_id == book.book_id);
                if (bookFromDb == null)
                {
                    return false;
                }
                var credentialsJson = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
                AuthViewModel cred = JsonConvert.DeserializeObject<AuthViewModel>(credentialsJson);

                var credentials = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
                if (cred != null)
                {
                    string authorFromToken = JWTHelper.ValidateToken(cred.token);

                    if (authorFromToken != null && cred.author == authorFromToken)
                    {
                        bookFromDb.author_id = book.author_id;
                        bookFromDb.genre_id = book.genre_id;
                        bookFromDb.title = book.title;
                        bookFromDb.description = book.description;
                        bookFromDb.publication_date = book.publication_date;
                        bookFromDb.isbn = book.isbn;
                        db.Entry(bookFromDb).State = System.Data.Entity.EntityState.Modified;

                        db.log.Add(new log()
                        {
                            author_id = book.author_id,
                            event_name = "EDIT",
                            event_date = DateTime.Now
                        });

                        db.SaveChanges();
                        return true;
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // DELETE api/book/5
        public void Delete(int id)
        {
        }
    }
}
