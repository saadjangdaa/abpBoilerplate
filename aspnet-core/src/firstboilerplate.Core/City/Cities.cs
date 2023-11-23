using Abp.Domain.Entities;
using firstboilerplate.Country;
using firstboilerplate.PhoneBook;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.City
{
    public class Cities : Entity<int>
    {
        public string CityName { get; set; }
        public int Population { get; set; }


        [ForeignKey("Country")]
        public int CountryId { get; set; }

        [InverseProperty("Cities")]
        public Countries Country { get; set; }

        public ICollection<Phonebook> Phonebooks { get; set; }
    }

}
