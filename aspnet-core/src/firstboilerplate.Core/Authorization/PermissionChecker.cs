using Abp.Authorization;
using firstboilerplate.Authorization.Roles;
using firstboilerplate.Authorization.Users;

namespace firstboilerplate.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
