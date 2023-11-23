using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using firstboilerplate.Authorization;
using firstboilerplate.Product;
using firstboilerplate.Products.Dto;
using firstboilerplate.Roles.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Products
{
    [AbpAuthorize(PermissionNames.Pages_Products)]
    public class ProductAppService : CrudAppService<firstboilerplate.Product.Products, ProductDto>
    {
        public ProductAppService(IRepository<firstboilerplate.Product.Products, int> repository) : base(repository)
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
