using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using firstboilerplate.EntityFrameworkCore;
using firstboilerplate.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace firstboilerplate.Web.Tests
{
    [DependsOn(
        typeof(firstboilerplateWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class firstboilerplateWebTestModule : AbpModule
    {
        public firstboilerplateWebTestModule(firstboilerplateEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(firstboilerplateWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(firstboilerplateWebMvcModule).Assembly);
        }
    }
}