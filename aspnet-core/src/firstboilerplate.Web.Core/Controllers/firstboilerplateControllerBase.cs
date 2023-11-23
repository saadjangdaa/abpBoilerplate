using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace firstboilerplate.Controllers
{
    public abstract class firstboilerplateControllerBase: AbpController
    {
        protected firstboilerplateControllerBase()
        {
            LocalizationSourceName = firstboilerplateConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
