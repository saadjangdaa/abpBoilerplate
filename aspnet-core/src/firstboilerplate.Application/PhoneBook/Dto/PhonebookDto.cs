using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.PhoneBook.Dto
{
    [AutoMap(typeof(firstboilerplate.PhoneBook.Phonebook))]
    public class PhonebookDto : Entity<int>, IEntityDto<int>
    {
        public string contactname { get; set; }
        public string contactaddress { get; set; }
        public int contactnumber { get; set; }
        public string contactemail { get; set; }

        [ForeignKey("City")]
        public int cityId { get; set; }

        public List<City.Cities> cities { get; set; }


    }
}
