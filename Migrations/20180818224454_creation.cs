using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TagIt.Migrations
{
    public partial class creation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TagBlock",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    MemberId = table.Column<int>(nullable: false),
                    Url = table.Column<string>(nullable: true),
                    SiteTitle = table.Column<string>(nullable: true),
                    SiteImageUrl = table.Column<string>(nullable: true),
                    TagType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagBlock", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TagBlock");
        }
    }
}
