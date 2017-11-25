using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AutoCity.Migrations
{
    public partial class AddTypeOfVehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AlterColumn<int>(
                name: "YearMade",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "YearMade",
                table: "Vehicles",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
