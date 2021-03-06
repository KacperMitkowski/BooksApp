﻿using BooksApp.Helpers;
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
using WebAPI.Helpers.Enum;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ApiBookController : ApiController
    {
        private KMdbEntities db = new KMdbEntities();
        // GET api/apiBook
        public IHttpActionResult Get()
        {
            var credentials = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
            if (credentials != null)
            {
                var loggedAuthor = credentials.Split('=')[0];
                var token = credentials.Split('=')[1];
                var authorFromToken = JWTHelper.ValidateToken(token);

                if (authorFromToken != null)
                {
                    var groupId = db.author.FirstOrDefault(x => x.login == authorFromToken).group_id;
                    List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                    if (loggedAuthor == authorFromToken && settings.Any(x => x.name == "book_access"))
                    {
                        var books = db.author.Where(x => x.login == authorFromToken).FirstOrDefault().book.Where(x => x.status == StatusesEnum.ACTIVE.ToString()).ToList();

                        return Json(new { books = books }, new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        });
                    }
                }
            }
            return Json(new EmptyResult());
        }

        // POST api/apiBook
        public IHttpActionResult Post(book book)
        {
            if (book == null || string.IsNullOrWhiteSpace(book.title) || string.IsNullOrWhiteSpace(book.description) || string.IsNullOrWhiteSpace(book.publication_date.ToString()) || string.IsNullOrWhiteSpace(book.isbn))
            {
                return Json(new { bookCreationSuccess = false, errorMessage = "Braki w następujących polach: tytuł, opis, data publikacji, isbn" });
            }

            var credentials = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
            if (credentials != null)
            {
                var loggedAuthor = credentials.Split('=')[0];
                var token = credentials.Split('=')[1];
                var authorFromToken = JWTHelper.ValidateToken(token);
                var groupId = db.author.FirstOrDefault(x => x.login == authorFromToken).group_id;
                List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                if (loggedAuthor == authorFromToken && settings.Any(x => x.name == "book_create"))
                {
                    book.status = StatusesEnum.ACTIVE.ToString();
                    var newBook = db.book.Add(book);

                    var log = db.log.Add(new log()
                    {
                        book_id = book.book_id,
                        author_id = book.author_id,
                        event_name = LogTypesEnum.CREATE.ToString(),
                        event_date = DateTime.Now
                    });

                    db.SaveChanges();
                    return Json(new { bookCreationSuccess = true });
                }
            }
            return Json(new { bookCreationSuccess = false, errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne" });
        }

        // PUT api/apiBook/5
        public IHttpActionResult Put(book book)
        {
            if (book == null || book.book_id == 0 || string.IsNullOrWhiteSpace(book.title) || string.IsNullOrWhiteSpace(book.description) || string.IsNullOrWhiteSpace(book.publication_date.ToString()) || string.IsNullOrWhiteSpace(book.isbn))
            {
                return Json(new { bookCreationSuccess = false, errorMessage = "Braki w następujących polach: tytuł, opis, data publikacji, isbn" });
            }
            var bookFromDb = db.book.FirstOrDefault(x => x.book_id == book.book_id);
            if (bookFromDb == null)
            {
                return Json(new { bookCreationSuccess = false, errorMessage = "Nie znaleziono książki" });
            }

            var credentials = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
            if (credentials != null)
            {
                var loggedAuthor = credentials.Split('=')[0];
                var token = credentials.Split('=')[1];
                var authorFromToken = JWTHelper.ValidateToken(token);
                var groupId = db.author.FirstOrDefault(x => x.login == authorFromToken).group_id;
                List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                if (loggedAuthor == authorFromToken && settings.Any(x => x.name == "book_edit"))
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
                    return Json(new { bookEditSuccess = true });
                }

            }
            return Json(new { bookCreationSuccess = false, errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne" });
        }

        // DELETE api/apiBook/5
        public IHttpActionResult Delete(int id)
        {
            if (id == 0)
            {
                return Json(new { bookDeleteSuccess = false, errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne" });
            }
            book book = db.book.FirstOrDefault(x => x.book_id == id);
            if (book == null)
            {
                return Json(new { bookDeleteSuccess = false, errorMessage = "Nie znaleziono książki" });
            }

            var credentials = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
            if (credentials != null)
            {
                var loggedAuthor = credentials.Split('=')[0];
                var token = credentials.Split('=')[1];
                var authorFromToken = JWTHelper.ValidateToken(token);
                var groupId = db.author.FirstOrDefault(x => x.login == authorFromToken).group_id;
                List<setting> settings = db.group.FirstOrDefault(x => x.group_id == groupId).group_setting.Select(x => x.setting).ToList();

                if (loggedAuthor == authorFromToken && settings.Any(x => x.name == "book_delete"))
                {
                    book.status = StatusesEnum.INACTIVE.ToString();
                    db.Entry(book).State = System.Data.Entity.EntityState.Modified;

                    var log = db.log.Add(new log()
                    {
                        book_id = book.book_id,
                        author_id = book.author_id,
                        event_name = LogTypesEnum.DELETE.ToString(),
                        event_date = DateTime.Now
                    });

                    db.SaveChanges();
                    return Json(new { bookDeleteSuccess = true });
                }
            }
            return Json(new { bookDeleteSuccess = false, errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne" });
        }
    }
}
