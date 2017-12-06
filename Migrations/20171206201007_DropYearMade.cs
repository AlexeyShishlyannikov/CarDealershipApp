using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AutoCity.Migrations
{
    public partial class DropYearMade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
					migrationBuilder.DropColumn(name: "YearMade", table: "Vehicles");

					migrationBuilder.AddColumn<int>(
							name: "YearMade",
							table: "Vehicles",
							nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
