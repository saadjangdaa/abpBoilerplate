using System.Threading.Tasks;
using firstboilerplate.Models.TokenAuth;
using firstboilerplate.Web.Controllers;
using Shouldly;
using Xunit;

namespace firstboilerplate.Web.Tests.Controllers
{
    public class HomeController_Tests: firstboilerplateWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}