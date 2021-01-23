using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BooksApp.Models;

namespace BooksApp.Controllers
{
    public class ApiBookController : ApiController
    {
        private KMdbEntities db = new KMdbEntities();

        // GET: api/ApiBook
        public IQueryable<book> Getbook()
        {
            return db.book;
        }

        // GET: api/ApiBook/5
        [ResponseType(typeof(book))]
        public IHttpActionResult Getbook(long id)
        {
            book book = db.book.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/ApiBook/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putbook(long id, book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.book_id)
            {
                return BadRequest();
            }

            db.Entry(book).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!bookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ApiBook
        [ResponseType(typeof(book))]
        public IHttpActionResult Postbook(book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.book.Add(book);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = book.book_id }, book);
        }

        // DELETE: api/ApiBook/5
        [ResponseType(typeof(book))]
        public IHttpActionResult Deletebook(long id)
        {
            book book = db.book.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            db.book.Remove(book);
            db.SaveChanges();

            return Ok(book);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool bookExists(long id)
        {
            return db.book.Count(e => e.book_id == id) > 0;
        }
    }
}