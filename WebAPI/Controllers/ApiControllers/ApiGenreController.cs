using BooksApp.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using WebAPI.Helpers.Enum;
using WebAPI.Models;

namespace WebAPI.Controllers.ApiControllers
{
    public class ApiGenreController : ApiController
    {
        private KMdbEntities db = new KMdbEntities();
        // GET api/apiGenre
        public IHttpActionResult Get()
        {
            var credentials = Request.Headers.FirstOrDefault(x => x.Key.Equals("Authorization")).Value.ToList()[0];
            if (credentials != null)
            {
                var loggedAuthor = credentials.Split('=')[0];
                var token = credentials.Split('=')[1];
                var authorFromToken = JWTHelper.ValidateToken(token);

                if (authorFromToken != null && loggedAuthor == authorFromToken)
                {
                    var genres = db.genre.ToList();
                    return Json(new { genres = genres }, new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });
                }
            }
            return Json(new EmptyResult());
        }
    }
}