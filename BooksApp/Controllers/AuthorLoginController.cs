using BooksApp.Helpers;
using BooksApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BooksApp.Controllers
{
    public class AuthorLoginController : Controller
    {
        private KMdbEntities db = new KMdbEntities();

        // POST: 
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult LoginAuthor([Bind(Include = "login,password")] author author)
        {
            List<string> errorMessages = new List<string>();

            try
            {
                if(author == null || author.login == null || author.password == null || string.IsNullOrWhiteSpace(author.login) || string.IsNullOrWhiteSpace(author.password))
                {
                    errorMessages.Add("Nie wprowadzono loginu lub hasła");
                    return Json(new { errorMessages = errorMessages, loginSuccess = false }, JsonRequestBehavior.AllowGet);
                }

                
                if(db.author.Any(x => x.login == author.login))
                {
                    string hashedPassword = db.author.FirstOrDefault(x => x.login == author.login).password; 
                    if(PasswordHelper.VerifyPassword(author.password, hashedPassword))
                    {
                        string token = JWTHelper.GenerateToken(author.login);

                        string userFromToken = JWTHelper.ValidateToken(token);

                        return Json(new { loginSuccess = true, token = token }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        errorMessages.Add("Błędny login lub hasło");
                    }
                }
                else
                {
                    errorMessages.Add("Błędny login lub hasło");
                    return Json(new { errorMessages = errorMessages, loginSuccess = false }, JsonRequestBehavior.AllowGet);
                }

            }
            catch(Exception e)
            {
                errorMessages.Add("Wystąpił błąd. Przepraszamy za kłopoty techniczne");
                return Json(new { errorMessages = errorMessages, author = author, loginSuccess = false }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { errorMessages = errorMessages, loginSuccess = false }, JsonRequestBehavior.AllowGet);
        }
    }
}