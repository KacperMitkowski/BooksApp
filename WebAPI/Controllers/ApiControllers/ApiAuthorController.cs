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
using WebAPI.Helpers.Enum;
using WebAPI.Models;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;

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
            author.status = StatusesEnum.ACTIVE.ToString();

            db.SaveChanges();
            return Json(new { registrationSuccess = true });
        }

        // POST api/login
        [HttpPost]
        public IHttpActionResult Login(author author)
        {
            try
            {
                if (author == null || string.IsNullOrWhiteSpace(author.login) || string.IsNullOrWhiteSpace(author.password))
                {
                    return Json(new { errorMessage = "Nie wprowadzono loginu lub hasła", loginSuccess = false });
                }

                if (db.author.Any(x => x.login == author.login))
                {
                    string hashedPassword = db.author.FirstOrDefault(x => x.login == author.login).password;
                    long authorId = db.author.FirstOrDefault(x => x.login == author.login).author_id;
                    if (PasswordHelper.VerifyPassword(author.password, hashedPassword))
                    {
                        string token = JWTHelper.GenerateToken(author.login);
                        return Json(new { loginSuccess = true, token = token, author = author.login, authorId = authorId });
                    }
                    else
                    {
                        return Json(new { errorMessage = "Błędny login lub hasło", loginSuccess = false });
                    }
                }
                else
                {
                    return Json(new { errorMessage = "Błędny login lub hasło", loginSuccess = false });
                }

            }
            catch (Exception e)
            {
                return Json(new { errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne", loginSuccess = false });
            }
        }
    }
}
