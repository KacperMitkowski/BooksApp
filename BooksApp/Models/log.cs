//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class log
    {
        public long log_id { get; set; }
        public Nullable<long> author_id { get; set; }
        public Nullable<long> admin_id { get; set; }
        public string event_name { get; set; }
        public Nullable<System.DateTime> event_date { get; set; }
        public string old_value { get; set; }
        public string new_value { get; set; }
    
        public virtual admin admin { get; set; }
        public virtual author author { get; set; }
    }
}