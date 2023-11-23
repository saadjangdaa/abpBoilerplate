using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using firstboilerplate.Configuration.Dto;

namespace firstboilerplate.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : firstboilerplateAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
