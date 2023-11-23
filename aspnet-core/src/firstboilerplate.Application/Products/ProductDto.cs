using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using firstboilerplate.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Products
{
    [AutoMap(typeof(firstboilerplate.Product.Products))]
    public class ProductDto : EntityDto<int>
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string ProductDescription { get; set; }
    }
}
