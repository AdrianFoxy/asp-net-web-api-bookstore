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
    [Migration("20220415084204_OrderAdded2")]
    partial class OrderAdded2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.15");

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

                    b.Property<DateTime?>("ResealeDate")
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

                    b.Property<string>("Address")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Deliverie");
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

                    b.Property<string>("ContactEmail")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactName")
                        .HasColumnType("longtext");

                    b.Property<int>("ContactPhone")
                        .HasColumnType("int");

                    b.Property<int>("Fk_DeliveryId")
                        .HasColumnType("int");

                    b.Property<int>("Fk_OrderStatusId")
                        .HasColumnType("int");

                    b.Property<float>("Sum")
                        .HasColumnType("float");

                    b.Property<string>("UserID")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("Fk_DeliveryId");

                    b.HasIndex("Fk_OrderStatusId");

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
