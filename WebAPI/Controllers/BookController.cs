using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebAPI.Controllers
{
    public class BookController : Controller
    {
        // GET: Book
        public ActionResult Index()
        {
            ViewBag.Title = "KM";
            return View();
        }

        // GET: Book/Details/5
        public ActionResult Details(int id)
        {
            ViewBag.Title = "KM";
            return View();
        }
    }
}