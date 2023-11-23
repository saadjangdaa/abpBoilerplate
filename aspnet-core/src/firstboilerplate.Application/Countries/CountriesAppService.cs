using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using firstboilerplate.Authorization;
using firstboilerplate.Countries.Dto;
using firstboilerplate.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Countries
{

    [AbpAuthorize(PermissionNames.Pages_Countries)]
    public class CountriesAppService : CrudAppService<firstboilerplate.Country.Countries, CountryDto>
    {
        public CountriesAppService(IRepository<firstboilerplate.Country.Countries, int> repository) : base(repository)
        {

        }
        //public async Task<GetProductforEditOutput> GetProductForEdit(EntityDto input)
        //{
        //    var permissions = PermissionManager.GetAllPermissions();
        //    var product = await _roleManager.GetRoleByIdAsync(input.Id);
        //    //var grantedPermissions = (await _roleManager.GetGrantedPermissionsAsync(role)).ToArray();
        //    var productEditDto = ObjectMapper.Map<ProductEditDto>(product);

        //    return new GetProductforEditOutput
        //    {
        //        //Permissions = ObjectMapper.Map<List<FlatPermissionDto>>(permissions).OrderBy(p => p.DisplayName).ToList(),
        //        //GrantedPermissionNames = grantedPermissions.Select(p => p.Name).ToList()
        //    };
        //}
    }
}
