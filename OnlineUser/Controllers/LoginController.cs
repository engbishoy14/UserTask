using OnlineUser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineUser.Controllers
{
    public class LoginController : Controller
    { 
        public ActionResult Index()
        {
            return View();
        } 
        public ActionResult Signin(string UserName, string UserEmail, string UserPassword)
        {
            using (var db = new UserDBContext())
            {
                List<User> luser = db.User.Where(q => q.UserEmail == UserEmail&&q.UserPassword==UserPassword).ToList();

                if (luser.Count ==1)
                {

                    Session["User"] = luser[0];
                    //return RedirectToAction("Index", "Home");
                    return new JsonResult { Data = new { created = true, JsonRequestBehavior.AllowGet } };

                }
               
                    
                return new JsonResult
                {
                    Data = new { NotFound = true }
                     ,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }



        }
    }
}