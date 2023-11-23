using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using firstboilerplate.City;
using firstboilerplate.Country;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.Countries.Dto
{
    [AutoMap(typeof(firstboilerplate.Country.Countries))]
    //[AutoMapFrom(typeof(firstboilerplate.Country.Countries))]
    //[AutoMapTo(typeof(Profirstboilerplate.Countries.Dto.CountryDtoduct))]

    public class CountryDto : Entity<int>, IEntityDto<int>
    {
        public string countryname { get; set; }
        public int countrycode { get; set; }
        public int countryrank { get; set; }

        public List<City.Cities> Cities { get; set; }
    }
}
