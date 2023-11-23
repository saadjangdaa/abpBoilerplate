using System.Threading.Tasks;
using Abp.Application.Services;
using firstboilerplate.Authorization.Accounts.Dto;

namespace firstboilerplate.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
