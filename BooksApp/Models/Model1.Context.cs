﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BooksApp.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class KMdbEntities : DbContext
    {
        public KMdbEntities()
            : base("name=KMdbEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<book> book { get; set; }
        public virtual DbSet<genre> genre { get; set; }
        public virtual DbSet<log> log { get; set; }
        public virtual DbSet<group_setting> group_setting { get; set; }
        public virtual DbSet<setting> setting { get; set; }
        public virtual DbSet<admin> admin { get; set; }
        public virtual DbSet<author> author { get; set; }
        public virtual DbSet<group> group { get; set; }
    }
}
