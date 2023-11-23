using System.Threading.Tasks;
using Abp.Application.Services;
using firstboilerplate.Sessions.Dto;

namespace firstboilerplate.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
