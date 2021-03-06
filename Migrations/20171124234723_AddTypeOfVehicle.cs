﻿using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AutoCity.Migrations
{
    public partial class AddTypeOfVehicle : Migration
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
