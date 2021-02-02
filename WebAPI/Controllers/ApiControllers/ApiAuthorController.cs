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
            try
            {
                // if empty data
                if (author == null || string.IsNullOrWhiteSpace(author.first_name) || string.IsNullOrWhiteSpace(author.last_name) || string.IsNullOrWhiteSpace(author.login) || string.IsNullOrWhiteSpace(author.password))
                {
                    return Json(new { registrationSuccess = false, errorMessage = "Braki w następujących polach: imię, nazwisko, login, hasło" });
                }

                // if login exists in db
                List<author> authorsFromDb = db.author.Select(x => x).ToList();
                if (authorsFromDb != null)
                {
                    if (authorsFromDb.Any(x => x.login == author.login))
                    {
                        return Json(new { registrationSuccess = false, errorMessage = "Istnieje już autor o tym loginie" });
                    }
                }

                // if data ok, try hash password
                var hashedPassword = PasswordHelper.HashPassword(author.password);
                var groupForAuthor = db.group.FirstOrDefault(x => x.name == "Author");
                // if problem in hashing password
                if (hashedPassword == null || groupForAuthor == null)
                {
                    return Json(new { registrationSuccess = false, errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne" });
                }

                author.password = hashedPassword;
                var a = db.author.Add(author);

                var group = db.group.FirstOrDefault(x => x.name == "Author");
                var newAuthorGroup = db.author_group.Add(new author_group()
                {
                    author = a,
                    group = group
                });

                var newLog = db.log.Add(new log()
                {
                    author = author,
                    event_name = LogTypesEnum.CREATE.ToString(),
                    event_date = DateTime.Now
                });
                db.SaveChanges();
                return Json(new { registrationSuccess = true });
            }
            catch (Exception e)
            {
                return Json(new { registrationSuccess = false, errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne" });
            }
        }
    }
}

/*
public string Post(author author)
{
    var formOk = true;

    try
    {
        // if empty data
        if (author == null || string.IsNullOrWhiteSpace(author.first_name) || string.IsNullOrWhiteSpace(author.last_name) || string.IsNullOrWhiteSpace(author.login) || string.IsNullOrWhiteSpace(author.password))
        {
            string result = JsonConvert.SerializeObject(new
            {
                errorMessage = "Braki w następujących polach: imię, nazwisko, login, hasło",
                registrationSuccess = false
            });

            return result;
        }

        // if login exists in db
        List<author> authorsFromDb = db.author.Select(x => x).ToList();
        if (authorsFromDb != null)
        {
            if (authorsFromDb.Any(x => x.login == author.login))
            {
                string result = JsonConvert.SerializeObject(new
                {
                    errorMessage = "Istnieje już autor o tym loginie",
                    registrationSuccess = false
                });

                return result;
            }
        }

        // if data ok, try hash password
        var hashedPassword = PasswordHelper.HashPassword(author.password);
        var groupForAuthor = db.group.FirstOrDefault(x => x.name == "Author");
        if (hashedPassword == null || groupForAuthor == null)
        {
            string result = JsonConvert.SerializeObject(new
            {
                errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne",
                registrationSuccess = false
            });

            return result;
        }

        if (formOk == true)
        {
            var group = db.group.FirstOrDefault(x => x.name == "Author");
            var newAuthorGroup = db.author_group.Add(new author_group()
            {
                author = author,
                group = group
            });
            author.password = hashedPassword;

            var newLog = db.log.Add(new log()
            {
                author = author,
                event_name = LogTypesEnum.CREATE.ToString(),
                event_date = DateTime.Now
            });
            db.SaveChanges();

            author createdAuthor = db.author.FirstOrDefault(x => x.author_id == author.author_id);
            createdAuthor.author_group_id = db.author_group.FirstOrDefault(x => x.author_id == author.author_id && x.group_id == group.group_id).author_group_id;

            db.Entry(createdAuthor).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            string result = JsonConvert.SerializeObject(new
            {
                registrationSuccess = true
            });

            return result;
        }
        else
        {
            string result = JsonConvert.SerializeObject(new
            {
                errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne",
                registrationSuccess = false
            });

            return result;
        }
    }
    catch (Exception e)
    {
        string result = JsonConvert.SerializeObject(new
        {
            errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne",
            registrationSuccess = false
        });

        return result;
    }
}

*/