using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using firstboilerplate.Authorization;
using firstboilerplate.Cities.Dto;
using firstboilerplate.PhoneBook.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace firstboilerplate.PhoneBook
{
    

    [AbpAuthorize(PermissionNames.Pages_Cities)]
    public class PhonebookAppService : CrudAppService<firstboilerplate.PhoneBook.Phonebook, PhonebookDto>
    {
        public PhonebookAppService(IRepository<firstboilerplate.PhoneBook.Phonebook, int> repository) : base(repository)
        {

        }
    }
}
