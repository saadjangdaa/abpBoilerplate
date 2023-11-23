using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using firstboilerplate.Authorization;
using firstboilerplate.Cities.Dto;
using firstboilerplate.Countries.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Cities
{
    [AbpAuthorize(PermissionNames.Pages_Cities)]
    public class CitiesAppService : CrudAppService<firstboilerplate.City.Cities, CitiesDto>
    {
        public CitiesAppService(IRepository<firstboilerplate.City.Cities, int> repository) : base(repository)
        {

        }

    }
}
