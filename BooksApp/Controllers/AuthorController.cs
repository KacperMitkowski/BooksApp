using BooksApp.Helpers;
using BooksApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BooksApp.Controllers
{
    public class AuthorController : Controller
    {
        private KMdbEntities db = new KMdbEntities();
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }

        // POST: Book/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create([Bind(Include = "first_name,last_name,login,password")] author author)
        {
            var formOk = true;
            List<string> errorMessages = new List<string>();

            if(author == null)
            {
                errorMessages.Add("Nie wprowadzono autora");
                formOk = false;
            }

            if(author != null && (string.IsNullOrWhiteSpace(author.first_name) || string.IsNullOrWhiteSpace(author.last_name) || string.IsNullOrWhiteSpace(author.login) || string.IsNullOrWhiteSpace(author.password)))
            {
                errorMessages.Add("Braki w następujących polach: imię, nazwisko, login, hasło");
                formOk = false;
            }

            List<author> authorsFromDb = db.author.Select(x => x).ToList();
            if(authorsFromDb != null)
            {
                foreach (var authorFromDb in authorsFromDb)
                {
                    if (authorFromDb.login == author.login)
                    {
                        errorMessages.Add("Istnieje już autor o tym loginie");
                        formOk = false;
                        break;
                    }
                }
            }

            try
            {
                var hashedPassword = Authentication.HashPassword(author.password);
                var groupForAuthor = db.group.FirstOrDefault(x => x.name == "Author");

                if (hashedPassword == null || groupForAuthor == null)
                {
                    formOk = false;
                    errorMessages.Add("Wystąpił błąd. Przepraszamy za kłopoty techniczne");
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
                        event_name = "CREATE",
                        event_date = DateTime.Now
                    });
                    db.SaveChanges();

                    var newAuthorGroupId = db.author_group.FirstOrDefault(x => x.author_id == author.author_id && x.group_id == group.group_id).author_group_id;
                    author createdAuthor = db.author.FirstOrDefault(x => x.author_id == author.author_id);
                    createdAuthor.author_group_id = newAuthorGroupId;

                    db.Entry(createdAuthor).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    return Json(new { errorMessages = errorMessages, author = author, success = true }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { errorMessages = errorMessages, author = author }, JsonRequestBehavior.AllowGet);
                }
            }
            catch(Exception e)
            {
                errorMessages.Add("Wystąpił błąd. Przepraszamy za kłopoty techniczne");
                return Json(new { errorMessages=errorMessages, author = author }, JsonRequestBehavior.AllowGet);
            }

            


            /*
            data validation
            if the same login
            
            
            if (ModelState.IsValid && formOk == true)
            {
                if ok -> hash password
                add author to db with hashed password

                db.author.Add(author);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            */

        }
    }
}