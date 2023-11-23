using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using firstboilerplate.Country;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Cities.Dto
{
    [AutoMap(typeof(firstboilerplate.City.Cities))]

    public class CitiesDto : Entity<int>, IEntityDto<int>
    {
        public string CityName { get; set; }
        public int Population { get; set; }

        [ForeignKey("Country")]
        public int CountryId { get; set; }

        public List<Country.Countries> countries { get; set; }

        public List<PhoneBook.Phonebook> phonebooks { get; set; }


    }
}
