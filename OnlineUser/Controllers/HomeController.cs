using OnlineUser.Models;
using OnlineUser.Process;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineUser.Controllers
{
    public class HomeController : Controller
    {
        private UserDBContext db = new UserDBContext();


        public ActionResult Index()
        {
            if (Session["User"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            var userInAction = (User)Session["User"];
            List<Todo> lTodo = db.Todo.Where(q => q.UserID == userInAction.UserID).ToList();

            return View(lTodo);

        }






        public JsonResult CreateNewUser(TodoJson User)
        {
            var userInAction = (User)Session["User"];
            if (ModelState.IsValid)
            {
                Todo objUser = new Todo()
                {
                    Title = User.Title,
                    UserID = userInAction.UserID,
                    IsMark = false
                };


                objUser.Date = DateTime.ParseExact(User.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture); 

                db.Todo.Add(objUser);
                db.SaveChanges();
                return new JsonResult()
                {
                    Data = new { add = true },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            return new JsonResult()
            {
                Data = new { add = false },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        public PartialViewResult UpdateShowView()
        {
            var userInAction = (User)Session["User"];
            //ViewBag.EmployeeTypeId = new SelectList(db.EmployeeType.Where(q => q.IsDeleted == "0"), "EmployeeTypeID", "EmployeeTypeName"); 
            List<Todo> lTodo = db.Todo.Where(q => q.UserID == userInAction.UserID).ToList();

            return PartialView("_index", lTodo);

        }




        public PartialViewResult UpdateEditView(string userId)
        {
            if (!String.IsNullOrWhiteSpace(userId))
            {
                long UserId = long.Parse(userId);
                var getUser = db.Todo.Find(UserId);
                if (getUser != null)
                {

                    return PartialView("_EditUser", getUser);
                }
                return PartialView("_NotFound");
            }

            return PartialView("_NotFound");

        }


        public JsonResult EditUser(TodoJson User)
        {
            if (ModelState.IsValid)
            {


                var check = db.Todo.Find(User.ID);
                if (check == null)
                {
                    return new JsonResult()
                    {
                        Data = new { Update = false },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
                else
                {
                    check.Title = User.Title;


                    check.Date = DateTime.ParseExact(User.Date, "dd/MM/yyyy", CultureInfo.InvariantCulture);


                    db.SaveChanges();
                    return new JsonResult()
                    {
                        Data = new { Update = true },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }

            }
            return new JsonResult()
            {
                Data = new { Update = false },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }



        public JsonResult DeleteUser(string userId)
        {
            if (String.IsNullOrWhiteSpace(userId))
            {
                return new JsonResult()
                {
                    Data = new { Deleted = false },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }

            var check = db.Todo.Find(long.Parse(userId));
            if (check != null)
            {
                db.Todo.Remove(check);
                db.SaveChanges();
                return new JsonResult()
                {
                    Data = new { Deleted = true },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            return new JsonResult()
            {
                Data = new { Deleted = false },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult ActivationUser(long UserId)
        {
            var check = db.Todo.Find(UserId);
            if (check != null)
            {

                check.IsMark = true;
                db.SaveChanges();
                return new JsonResult()
                {
                    Data = new { Activtion = true },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };



            }
            return new JsonResult()
            {
                Data = new { Activtion = false },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }



    }
}