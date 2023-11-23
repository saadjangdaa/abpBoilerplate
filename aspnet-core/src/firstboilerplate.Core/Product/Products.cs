using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using firstboilerplate.Authorization.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Product
{
    public class Products : Entity<int>
    {

        public string Name { get; set; }
        public int Quantity { get; set; }
        public string ProductDescription { get; set; }
    }
}
