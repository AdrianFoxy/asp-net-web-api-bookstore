﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebBookShopProject.Data;

namespace WebBookShopProject.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20220513035830_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.15");

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Author", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext");

                    b.Property<string>("NameForUrl")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Author");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("Fk_PublisherId")
                        .HasColumnType("int");

                    b.Property<string>("Format")
                        .HasColumnType("longtext");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("longtext");

                    b.Property<bool>("IsFavor")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LongDescription")
                        .HasColumnType("longtext");

                    b.Property<int>("Pages")
                        .HasColumnType("int");

                    b.Property<float>("Price")
                        .HasColumnType("float");

                    b.Property<DateTime?>("ReleaseDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("Fk_PublisherId");

                    b.ToTable("Book");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Book_Author", b =>
                {
                    b.Property<int>("Fk_BookId")
                        .HasColumnType("int");

                    b.Property<int>("Fk_AuthorId")
                        .HasColumnType("int");

                    b.HasKey("Fk_BookId", "Fk_AuthorId");

                    b.HasIndex("Fk_AuthorId");

                    b.ToTable("Book_Author");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Book_Genre", b =>
                {
                    b.Property<int>("Fk_BookId")
                        .HasColumnType("int");

                    b.Property<int>("Fk_GenreId")
                        .HasColumnType("int");

                    b.HasKey("Fk_BookId", "Fk_GenreId");

                    b.HasIndex("Fk_GenreId");

                    b.ToTable("Book_Genre");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Delivery", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Delivery");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Genre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("Fk_TypeGenreId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("NameForUrl")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("Fk_TypeGenreId");

                    b.ToTable("Genre");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactName")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactPhone")
                        .HasColumnType("longtext");

                    b.Property<int>("Fk_DeliveryId")
                        .HasColumnType("int");

                    b.Property<int>("Fk_OrderStatusId")
                        .HasColumnType("int");

                    b.Property<double>("Sum")
                        .HasColumnType("double");

                    b.Property<string>("UserID")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("Fk_DeliveryId");

                    b.HasIndex("Fk_OrderStatusId");

                    b.HasIndex("UserID");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.OrderItem", b =>
                {
                    b.Property<int>("Fk_BookId")
                        .HasColumnType("int");

                    b.Property<int>("Fk_OrderId")
                        .HasColumnType("int");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.HasKey("Fk_BookId", "Fk_OrderId");

                    b.HasIndex("Fk_OrderId");

                    b.ToTable("OrderItem");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.OrderStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("OrderStatus");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Publisher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Publisher");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.ShoppingCartItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int?>("BookId")
                        .HasColumnType("int");

                    b.Property<string>("ShoppingCartId")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.ToTable("ShoppingCartItem");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.TypeGenre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("NameForUrl")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("TypeGenre");
                });

            modelBuilder.Entity("WebBookShopProject.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FullName")
                        .HasColumnType("longtext");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("WebBookShopProject.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("WebBookShopProject.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebBookShopProject.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("WebBookShopProject.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Book", b =>
                {
                    b.HasOne("WebBookShopProject.Data.Models.Publisher", "Publisher")
                        .WithMany("Book")
                        .HasForeignKey("Fk_PublisherId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Publisher");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Book_Author", b =>
                {
                    b.HasOne("WebBookShopProject.Data.Models.Author", "Author")
                        .WithMany("Book_Author")
                        .HasForeignKey("Fk_AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebBookShopProject.Data.Models.Book", "Book")
                        .WithMany("Book_Author")
                        .HasForeignKey("Fk_BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Book");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Book_Genre", b =>
                {
                    b.HasOne("WebBookShopProject.Data.Models.Book", "Book")
                        .WithMany("Book_Genre")
                        .HasForeignKey("Fk_BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebBookShopProject.Data.Models.Genre", "Genre")
                        .WithMany("Book_Genre")
                        .HasForeignKey("Fk_GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Genre", b =>
                {
                    b.HasOne("WebBookShopProject.Data.Models.TypeGenre", "TypeGenre")
                        .WithMany("Genre")
                        .HasForeignKey("Fk_TypeGenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TypeGenre");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Order", b =>
                {
                    b.HasOne("WebBookShopProject.Data.Models.Delivery", "Delivery")
                        .WithMany("Order")
                        .HasForeignKey("Fk_DeliveryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebBookShopProject.Data.Models.OrderStatus", "OrderStatus")
                        .WithMany("Order")
                        .HasForeignKey("Fk_OrderStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebBookShopProject.Models.ApplicationUser", "ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserID");

                    b.Navigation("ApplicationUser");

                    b.Navigation("Delivery");

                    b.Navigation("OrderStatus");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.OrderItem", b =>
                {
                    b.HasOne("WebBookShopProject.Data.Models.Book", "Book")
                        .WithMany("OrderItem")
                        .HasForeignKey("Fk_BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebBookShopProject.Data.Models.Order", "Order")
                        .WithMany("OrderItem")
                        .HasForeignKey("Fk_OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.ShoppingCartItem", b =>
                {
                    b.HasOne("WebBookShopProject.Data.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId");

                    b.Navigation("Book");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Author", b =>
                {
                    b.Navigation("Book_Author");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Book", b =>
                {
                    b.Navigation("Book_Author");

                    b.Navigation("Book_Genre");

                    b.Navigation("OrderItem");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Delivery", b =>
                {
                    b.Navigation("Order");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Genre", b =>
                {
                    b.Navigation("Book_Genre");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Order", b =>
                {
                    b.Navigation("OrderItem");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.OrderStatus", b =>
                {
                    b.Navigation("Order");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.Publisher", b =>
                {
                    b.Navigation("Book");
                });

            modelBuilder.Entity("WebBookShopProject.Data.Models.TypeGenre", b =>
                {
                    b.Navigation("Genre");
                });
#pragma warning restore 612, 618
        }
    }
}
