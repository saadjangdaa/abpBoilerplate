using System.Threading.Tasks;
using firstboilerplate.Configuration.Dto;

namespace firstboilerplate.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
