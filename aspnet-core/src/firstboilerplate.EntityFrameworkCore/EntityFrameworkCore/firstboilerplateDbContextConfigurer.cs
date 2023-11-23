using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace firstboilerplate.EntityFrameworkCore
{
    public static class firstboilerplateDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<firstboilerplateDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<firstboilerplateDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
