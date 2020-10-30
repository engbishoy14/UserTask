using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineUser.Process
{
    public class JsonFormat
    {
    }
    public class TodoJson
    {

        public int ID { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Date { get; set; }
        public int UserID { get; set; } 
        public bool IsMark { get; set; }
         

    }
}