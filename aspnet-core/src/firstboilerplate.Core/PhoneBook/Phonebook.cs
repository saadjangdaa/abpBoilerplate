using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using firstboilerplate.City;
using firstboilerplate.Country;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.PhoneBook
{
    public class Phonebook : Entity<int>
    {
        public string contactname { get; set; }
        public string contactaddress { get; set; }
        public int contactnumber { get; set; }
        public string contactemail { get; set; }

        [ForeignKey("City")]
        public int cityId { get; set; }

        [InverseProperty("Phonebooks")]
        public Cities City { get; set; }


    }
}
