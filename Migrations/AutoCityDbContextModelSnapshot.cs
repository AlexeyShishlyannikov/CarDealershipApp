﻿// <auto-generated />
using AutoCity.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace AutoCity.Migrations
{
    [DbContext(typeof(AutoCityDbContext))]
    partial class AutoCityDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AutoCity.Core.Models.Contacts", b =>
                {
                    b.Property<byte>("Id");

                    b.Property<string>("City");

                    b.Property<string>("ContactName");

                    b.Property<string>("FacebookUrl");

                    b.Property<string>("InstagramUrl");

                    b.Property<string>("Phone");

                    b.Property<string>("Street");

                    b.Property<string>("ZipCode");

                    b.HasKey("Id");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("AutoCity.Core.Models.Make", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Makes");
                });

            modelBuilder.Entity("AutoCity.Core.Models.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MakeId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("MakeId");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("AutoCity.Core.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FileName");

                    b.Property<int>("VehicleId")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("AutoCity.Core.Models.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Color");

                    b.Property<string>("Features");

                    b.Property<DateTime>("LastUpdate");

                    b.Property<int>("MPG");

                    b.Property<int>("Mileage");

                    b.Property<int>("ModelId");

                    b.Property<int>("Price");

                    b.Property<string>("TransmissionType");

                    b.Property<string>("VinNumber");

                    b.Property<int>("YearMade");

                    b.HasKey("Id");

                    b.HasIndex("ModelId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("AutoCity.Core.Models.Model", b =>
                {
                    b.HasOne("AutoCity.Core.Models.Make", "Make")
                        .WithMany("Models")
                        .HasForeignKey("MakeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AutoCity.Core.Models.Photo", b =>
                {
                    b.HasOne("AutoCity.Core.Models.Vehicle")
                        .WithMany("Photos")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AutoCity.Core.Models.Vehicle", b =>
                {
                    b.HasOne("AutoCity.Core.Models.Model", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
