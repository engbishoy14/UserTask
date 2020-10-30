using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineUser.Models
{
    public class Todo
    {
        [Key]
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public int UserID { get; set; }
        public virtual User User { get; set; }
        public bool IsMark { get; set; }

    }
}