using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Products.Dto
{
    public class ProductEditDto : EntityDto<int>
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string ProductDescription { get; set; }
    }
}
