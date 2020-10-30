using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace OnlineUser.Models
{
    public class UserDBContext : DbContext

    {

        public UserDBContext() : base("name=UserDBContext")

        {
             

        }

        public DbSet<User> User { get; set; }
        public DbSet<Todo> Todo { get; set; }

    }

}
