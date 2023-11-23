using Microsoft.EntityFrameworkCore.Migrations;

namespace firstboilerplate.Migrations
{
    public partial class addphonebook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "phonebooks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    contactname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    contactaddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    contactnumber = table.Column<int>(type: "int", nullable: false),
                    contactemail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    cityId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_phonebooks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_phonebooks_Cities_cityId",
                        column: x => x.cityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_phonebooks_cityId",
                table: "phonebooks",
                column: "cityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "phonebooks");
        }
    }
}
