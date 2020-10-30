using OnlineUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineUser.Controllers
{
    public class RegisterationController : Controller
    {
        // GET: Registeration
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create(string UserName, string UserEmail, string UserPassword)
        {
            using (var db = new UserDBContext())
            {
                var check = db.User.SingleOrDefault(q => q.UserEmail == UserEmail);
                if (check == null)
                {
                    User User = new User()
                    {
                        UserName = UserName,
                        UserEmail = UserEmail,
                        UserPassword = UserPassword
                    };
                    db.User.Add(User);
                    db.SaveChanges();
                    //return RedirectToAction("Index", "Login");

                    return new JsonResult { Data = new { created = true, JsonRequestBehavior.AllowGet } };

                }
                return new JsonResult
                {
                    Data = new { Found = true }
                     ,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }



        }
    }
}