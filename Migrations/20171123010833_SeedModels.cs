using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AutoCity.Migrations
{
    public partial class SeedModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A3', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A4', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A5', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A6', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A7', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('A8', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Q3', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Q5', 3)");
			migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Q7', 3)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
