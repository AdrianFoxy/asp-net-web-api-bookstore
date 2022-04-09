using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public class BookService : IBookService
    {
        private AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BookService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            var result = await _context.Book.ToListAsync();
            return result;
        }

        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllWithAuthorAsync()
        {
            var result = await _context.Book.Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ResealeDate = book.ResealeDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllByAuthor(string fullName)
        {
            var result = await _context.Book.Where(g => g.Book_Author.Any(mg => mg.Author.FullName == fullName)).Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ResealeDate = book.ResealeDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).ToListAsync();
            return result;
        }

        public async Task<IEnumerable<BookWithAuthorsVM>> GetAllByGenre(string genre)
        {
            var result = await _context.Book.Where(g => g.Book_Genre.Any(mg => mg.Genre.Name == genre)).Select(book => new BookWithAuthorsVM()
            {
                Id = book.Id,
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ResealeDate = book.ResealeDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).ToListAsync();
            return result;
        }

        public async Task<BookFullInfoVM> GetByIdAsync(int id)
        {
            var _book_full =  await _context.Book.Where(n => n.Id == id).Select(book => new BookFullInfoVM()
            {
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = book.ImageUrl,
                IsFavor = book.IsFavor,
                ResealeDate = book.ResealeDate,
                PublisherName = book.Publisher.Name,
                AuthorNames = book.Book_Author.Select(n => n.Author.FullName).ToList(),
                GenreNames = book.Book_Genre.Select(g => g.Genre.Name).ToList()
            }).FirstOrDefaultAsync();

            return _book_full;
        }

        public async Task AddBookAsync (BookVM book, string pathImg)
        {
            var _book = new Book()
            {
                Title = book.Title,
                Pages = book.Pages,
                Format = book.Format,
                LongDescription = book.LongDescription,
                ShortDescription = book.ShortDescription,
                Amount = book.Amount,
                Price = book.Price,
                ImageUrl = pathImg,
                IsFavor = book.IsFavor,
                ResealeDate = book.ResealeDate,
                Fk_PublisherId = book.Fk_PublisherId
            };
            await _context.Book.AddAsync(_book);
            await _context.SaveChangesAsync();

            foreach (var id in book.AuthorsId)
            {
                var _book_author = new Book_Author()
                {
                    Fk_BookId = _book.Id,
                    Fk_AuthorId = id
                };
                await _context.Book_Author.AddAsync(_book_author);
                await _context.SaveChangesAsync();
            }

            foreach (var id in book.GenresId)
            {
                var _book_genre = new Book_Genre()
                {
                    Fk_BookId = _book.Id,
                    Fk_GenreId = id
                };
                await _context.Book_Genre.AddAsync(_book_genre);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Book> UpdateAsync(int id, BookImgVM book, string imagePath)
        {

            var _book = await _context.Book.FirstOrDefaultAsync(n => n.Id == id);
            if(_book != null)
            {
                _book.Title = book.Title;
                _book.Pages = book.Pages;
                _book.Format = book.Format;
                _book.LongDescription = book.LongDescription;
                _book.ShortDescription = book.ShortDescription;
                _book.ImageUrl = imagePath;
                _book.Amount = book.Amount;
                _book.Price = book.Price;
                _book.IsFavor = book.IsFavor;
                _book.ResealeDate = book.ResealeDate;

                await _context.SaveChangesAsync();
            };
            // Remove existing authors
            var existingAuthorsDb = _context.Book_Author.Where(n => n.Fk_BookId == id).ToList();
            _context.Book_Author.RemoveRange(existingAuthorsDb);
            await _context.SaveChangesAsync();

            // Add book authors
            foreach (var AuthorId in book.AuthorsId)
            {
                var newAuthorBook = new Book_Author()
                {
                    Fk_BookId = id,
                    Fk_AuthorId = AuthorId
                };
                await _context.Book_Author.AddAsync(newAuthorBook);
            }
            await _context.SaveChangesAsync();

            var existingGenresDb = _context.Book_Genre.Where(n => n.Fk_BookId == id).ToList();
            _context.Book_Genre.RemoveRange(existingGenresDb);
            await _context.SaveChangesAsync();

            // Add book authors
            foreach (var GenreId in book.GenresId)
            {
                var newGenreBook = new Book_Genre()
                {
                    Fk_BookId = id,
                    Fk_GenreId = GenreId
                };
                await _context.Book_Genre.AddAsync(newGenreBook);
            }
            await _context.SaveChangesAsync();

            return _book;
        }

        public async Task DeleteAsync(int id)
        {
            var _book = await _context.Book.FirstOrDefaultAsync(n => n.Id == id);
            if(_book != null)
            {
                _context.Book.Remove(_book);
                await _context.SaveChangesAsync();
            } 
        }
    }
}
