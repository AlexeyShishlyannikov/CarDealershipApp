using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AutoCity.Migrations
{
    public partial class PopulateMakesAndModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Acura')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Alfa Romeo')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Audi')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('BMW')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Buick')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Cadillac')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Chevrolet')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Chrysler')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Dodge')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('FIAT')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Land Rover')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Lexus')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Lincoln')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('MINI')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Maserati')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Mazda')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Mercedes-Benz')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Mitsubishi')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Nissan')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Ford')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('GMC')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Genesis')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Honda')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Hyundai')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Infiniti')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Jaguar')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Jeep')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Kia')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Porsche')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Ram')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Scion')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Subaru')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Toyota')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Volkswagen')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Volvo')");
			migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Smart')");
		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.Sql("DELETE FROM Makes");
        }
    }
}
