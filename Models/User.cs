using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectAxial.Models {
  public class User {
    public int Id { get; set; }
    public string PasswordHash { get; set; }
    public string ScreenName { get; set; }
    public string AccountName { get; set; }
    public string Email { get; set; }
    public int MyProperty { get; set; }

    ///still thinking how to tie in OAuth, should probably sketch this out

  }


}