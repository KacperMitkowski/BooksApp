//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class group_setting
    {
        public long group_setting_id { get; set; }
        public long group_id { get; set; }
        public long setting_id { get; set; }
    
        public virtual setting setting { get; set; }
        public virtual group group { get; set; }
    }
}
