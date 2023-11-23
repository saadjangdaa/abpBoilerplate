using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using firstboilerplate.Authorization.Roles;
using firstboilerplate.Authorization.Users;
using firstboilerplate.MultiTenancy;
using firstboilerplate.Product;

using Microsoft.EntityFrameworkCore.Internal;
using firstboilerplate.Country;
using firstboilerplate.City;
using firstboilerplate.PhoneBook;

namespace firstboilerplate.EntityFrameworkCore
{
    public class firstboilerplateDbContext : AbpZeroDbContext<Tenant, Role, User, firstboilerplateDbContext>
    {

        public DbSet<Products> Products { get; set; }
        public DbSet<Countries> Countries { get; set; }   

        public DbSet<Cities> Cities { get;set; }
        public DbSet<Phonebook> phonebooks { get; set; }
        /* Define a DbSet for each entity of the application */

        public firstboilerplateDbContext(DbContextOptions<firstboilerplateDbContext> options)
            : base(options)
        {
        }
    }
}
