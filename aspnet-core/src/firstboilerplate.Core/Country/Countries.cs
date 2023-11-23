using Abp.Domain.Entities;
using firstboilerplate.City;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Country
{
    public class Countries : Entity<int>
    {
        public string countryname { get; set; }
        public int countrycode { get; set; }
        public int countryrank { get; set; }

        [InverseProperty("Country")]
        public ICollection<Cities> Cities { get; set; }
    }
}
