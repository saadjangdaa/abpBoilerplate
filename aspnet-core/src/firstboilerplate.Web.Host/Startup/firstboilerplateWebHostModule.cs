using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using firstboilerplate.Configuration;

namespace firstboilerplate.Web.Host.Startup
{
    [DependsOn(
       typeof(firstboilerplateWebCoreModule))]
    public class firstboilerplateWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public firstboilerplateWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(firstboilerplateWebHostModule).GetAssembly());
        }
    }
}
