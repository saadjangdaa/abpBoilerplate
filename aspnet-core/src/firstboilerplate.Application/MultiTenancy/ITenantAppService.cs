using Abp.Application.Services;
using firstboilerplate.MultiTenancy.Dto;

namespace firstboilerplate.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

