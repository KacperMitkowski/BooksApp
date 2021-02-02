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
using WebAPI.Helpers;
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

                if (authorFromToken != null)
                {
                    long? authorGroupId = db.author.FirstOrDefault(x => x.login.Trim().ToLower() == authorFromToken.Trim().ToLower()).author_group_id;
                    long groupId = db.author_group.FirstOrDefault(x => x.author_group_id == authorGroupId).group_id;
                    List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                    if (authorFromToken != null && loggedAuthor == authorFromToken && settings.Any(x => x.name == "book_access"))
                    {
                        var books = JsonConvert.SerializeObject(db.author.Where(x => x.login == authorFromToken).FirstOrDefault().book.Where(x => x.status == "ACTIVE").ToList(),
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });

                        return books;

                    }
                    return null;
                }
                return null;
            }

            return null;
        }

        // POST api/apiBook
        public bool Post(book book)
        {
            try
            {
                if (book == null || string.IsNullOrWhiteSpace(book.title) || string.IsNullOrWhiteSpace(book.description) || string.IsNullOrWhiteSpace(book.publication_date.ToString()) || string.IsNullOrWhiteSpace(book.isbn))
                {
                    return false;
                }
                var credentialsJson = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
                AuthViewModel cred = JsonConvert.DeserializeObject<AuthViewModel>(credentialsJson);

                if (cred != null)
                {
                    string authorFromToken = JWTHelper.ValidateToken(cred.token);
                    if (authorFromToken != null)
                    {
                        long? authorGroupId = db.author.FirstOrDefault(x => x.login.Trim().ToLower() == authorFromToken.Trim().ToLower()).author_group_id;
                        long groupId = db.author_group.FirstOrDefault(x => x.author_group_id == authorGroupId).group_id;
                        List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                        if (authorFromToken != null && cred.author == authorFromToken && settings.Any(x => x.name == "book_create"))
                        {
                            book.status = "ACTIVE";
                            var newBook = db.book.Add(book);

                            var log = db.log.Add(new log()
                            {
                                book_id = book.book_id,
                                author_id = book.author_id,
                                event_name = LogTypesEnum.CREATE.ToString(),
                                event_date = DateTime.Now
                            });

                            db.SaveChanges();
                            return true;
                        }
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // PUT api/apiBook/5
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

                if (cred != null)
                {
                    string authorFromToken = JWTHelper.ValidateToken(cred.token);
                    if (authorFromToken != null)
                    {
                        long? authorGroupId = db.author.FirstOrDefault(x => x.login.Trim().ToLower() == authorFromToken.Trim().ToLower()).author_group_id;
                        long groupId = db.author_group.FirstOrDefault(x => x.author_group_id == authorGroupId).group_id;
                        List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                        if (authorFromToken != null && cred.author == authorFromToken && settings.Any(x => x.name == "book_edit"))
                        {
                            bookFromDb.author_id = book.author_id;
                            bookFromDb.genre_id = book.genre_id;
                            bookFromDb.title = book.title;
                            bookFromDb.description = book.description;
                            bookFromDb.publication_date = book.publication_date;
                            bookFromDb.isbn = book.isbn;
                            db.Entry(bookFromDb).State = System.Data.Entity.EntityState.Modified;

                            var log = db.log.Add(new log()
                            {
                                book_id = book.book_id,
                                author_id = book.author_id,
                                event_name = LogTypesEnum.EDIT.ToString(),
                                event_date = DateTime.Now
                            });

                            db.SaveChanges();
                            return true;
                        }
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // DELETE api/apiBook/5
        public bool Delete(int id)
        {
            try
            {
                if (id == 0)
                {
                    return false;
                }
                book book = db.book.FirstOrDefault(x => x.book_id == id);
                if (book == null)
                {
                    return false;
                }

                var credentialsJson = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
                AuthViewModel cred = JsonConvert.DeserializeObject<AuthViewModel>(credentialsJson);
                if (cred != null)
                {
                    string authorFromToken = JWTHelper.ValidateToken(cred.token);
                    if (authorFromToken != null)
                    {


                        long? authorGroupId = db.author.FirstOrDefault(x => x.login.Trim().ToLower() == authorFromToken.Trim().ToLower()).author_group_id;
                        long groupId = db.author_group.FirstOrDefault(x => x.author_group_id == authorGroupId).group_id;
                        List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                        if (authorFromToken != null && cred.author == authorFromToken && settings.Any(x => x.name == "book_delete"))
                        {
                            book.status = "INACTIVE";
                            db.Entry(book).State = System.Data.Entity.EntityState.Modified;

                            var log = db.log.Add(new log()
                            {
                                book_id = book.book_id,
                                author_id = book.author_id,
                                event_name = LogTypesEnum.DELETE.ToString(),
                                event_date = DateTime.Now
                            });

                            db.SaveChanges();
                            return true;
                        }
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }

        }
    }
}
