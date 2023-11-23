using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using firstboilerplate.Authorization;

namespace firstboilerplate
{
    [DependsOn(
        typeof(firstboilerplateCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class firstboilerplateApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<firstboilerplateAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(firstboilerplateApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
