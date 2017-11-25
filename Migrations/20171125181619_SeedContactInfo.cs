using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AutoCity.Migrations
{
    public partial class SeedContactInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<byte>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    ContactName = table.Column<string>(nullable: true),
                    FacebookUrl = table.Column<string>(nullable: true),
                    InstagramUrl = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    ZipCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });
			migrationBuilder.Sql("INSERT INTO Contacts (Id,ContactName, Phone, Street, City, ZipCode, FacebookUrl, InstagramUrl) VALUES (1,'','','','','','','')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contacts");
        }
    }
}
