using BooksApp.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using WebAPI.Helpers;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ApiAuthorController : ApiController
    {
        private KMdbEntities db = new KMdbEntities();

        // POST api/author
        public IHttpActionResult Post(author author)
        {
            // if empty data
            if (author == null || string.IsNullOrWhiteSpace(author.first_name) || string.IsNullOrWhiteSpace(author.last_name) || string.IsNullOrWhiteSpace(author.login) || string.IsNullOrWhiteSpace(author.password))
            {
                return Json(new { registrationSuccess = false, errorMessage = "Braki w następujących polach: imię, nazwisko, login, hasło" });
            }

            // if login exists in db
            List<author> authorsFromDb = db.author.Select(x => x).ToList();
            if (authorsFromDb != null && authorsFromDb.Any(x => x.login == author.login))
            {
                return Json(new { registrationSuccess = false, errorMessage = "Istnieje już autor o tym loginie" });
            }

            // if problem in hashing password or getting group for author
            var hashedPassword = PasswordHelper.HashPassword(author.password);
            var groupForAuthor = db.group.FirstOrDefault(x => x.name == "Author");
            if (hashedPassword == null || groupForAuthor == null)
            {
                return Json(new { registrationSuccess = false, errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne" });
            }

            // if everything ok
            // add log
            var group = db.group.FirstOrDefault(x => x.name == "Author");
            var newLog = db.log.Add(new log()
            {
                author = author,
                event_name = LogTypesEnum.CREATE.ToString(),
                event_date = DateTime.Now
            });

            // add author details
            author.password = hashedPassword;
            author.group = group;
            author.status = "ACTIVE";

            db.SaveChanges();
            return Json(new { registrationSuccess = true });
        }
    }
}
