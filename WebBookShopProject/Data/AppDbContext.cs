using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Models;

namespace WebBookShopProject.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Book_Author>().HasKey(am => new
            {
                am.Fk_BookId,
                am.Fk_AuthorId
            });

            modelBuilder.Entity<Book_Author>().HasOne(m => m.Book).WithMany((System.Linq.Expressions.Expression<Func<Book, IEnumerable<Book_Author>>>)(am => (IEnumerable<Book_Author>)am.Book_Author)).HasForeignKey(m =>
            m.Fk_BookId);

            modelBuilder.Entity<Book_Author>().HasOne(m => m.Author).WithMany(am => am.Book_Author).HasForeignKey(m =>
            m.Fk_AuthorId);
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book_Genre>().HasKey(am => new
            {
                am.Fk_BookId,
                am.Fk_GenreId
            });

            modelBuilder.Entity<Book_Genre>().HasOne(m => m.Book).WithMany((System.Linq.Expressions.Expression<Func<Book, IEnumerable<Book_Genre>>>)(am => (IEnumerable<Book_Genre>)am.Book_Genre)).HasForeignKey(m =>
            m.Fk_BookId);

            modelBuilder.Entity<Book_Genre>().HasOne(m => m.Genre).WithMany(am => am.Book_Genre).HasForeignKey(m =>
            m.Fk_GenreId);
            base.OnModelCreating(modelBuilder);



            modelBuilder.Entity<OrderItem>().HasKey(am => new
            {
                am.Fk_BookId,
                am.Fk_OrderId
            });

            modelBuilder.Entity<OrderItem>().HasOne(m => m.Book).WithMany((System.Linq.Expressions.Expression<Func<Book, IEnumerable<OrderItem>>>)(am => (IEnumerable<OrderItem>)am.OrderItem)).HasForeignKey(m =>
            m.Fk_BookId);

            modelBuilder.Entity<OrderItem>().HasOne(m => m.Order).WithMany(am => am.OrderItem).HasForeignKey(m =>
            m.Fk_OrderId);
            base.OnModelCreating(modelBuilder);

        }

        public DbSet<Book> Book { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<Book_Author> Book_Author { get; set; }
        public DbSet<Publisher> Publisher { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<TypeGenre> TypeGenre { get; set; }
        public DbSet<Book_Genre> Book_Genre { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderStatus> OrderStatus { get; set; }
        public DbSet<Delivery> Delivery { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }
        public DbSet<ShoppingCartItem> ShoppingCartItem { get; set; }

    }
}
