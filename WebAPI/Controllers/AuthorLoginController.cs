using BooksApp.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AuthorLoginController : Controller
    {
        private KMdbEntities db = new KMdbEntities();
        // POST: 
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Login([Bind(Include = "login,password")] author author)
        {

            try
            {
                if (author == null || author.login == null || author.password == null || string.IsNullOrWhiteSpace(author.login) || string.IsNullOrWhiteSpace(author.password))
                {
                    return Json(new { errorMessage = "Nie wprowadzono loginu lub hasła", loginSuccess = false }, JsonRequestBehavior.AllowGet);
                }

                if (db.author.Any(x => x.login == author.login))
                {
                    string hashedPassword = db.author.FirstOrDefault(x => x.login == author.login).password;
                    if (PasswordHelper.VerifyPassword(author.password, hashedPassword))
                    {
                        string token = JWTHelper.GenerateToken(author.login);

                        string allAuthors = JsonConvert.SerializeObject(db.author.ToList(),
                            new JsonSerializerSettings()
                            {
                                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                            });
                        return Json(new { loginSuccess = true, token = token, author = author.login, allAuthors = allAuthors }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { errorMessage = "Błędny login lub hasło", loginSuccess = false }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { errorMessage = "Błędny login lub hasło", loginSuccess = false }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception e)
            {
                return Json(new { errorMessage = "Wystąpił błąd. Przepraszamy za kłopoty techniczne", loginSuccess = false }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}