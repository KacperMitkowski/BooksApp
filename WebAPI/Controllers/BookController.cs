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
            ViewBag.Title = "Kacper Mitkowski";
            return View();
        }
        // GET: Book/Details/5
        public ActionResult Create()
        {
            ViewBag.Title = "Kacper Mitkowski";
            return View();
        }
        // GET: Book/Details/5
        public ActionResult Details(int id)
        {
            ViewBag.Title = "Kacper Mitkowski";
            return View();
        }

        // GET: Book/Edit/5
        public ActionResult Edit(int id)
        {
            ViewBag.Title = "Kacper Mitkowski";
            return View();
        }
    }
}