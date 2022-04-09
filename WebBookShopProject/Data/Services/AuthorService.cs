using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public class AuthorService : EntityBaseRepository<Author>, IAuthorService
    {

        private AppDbContext _context;

        public AuthorService(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task AddAuthorAsync(AuthorVM author)
        {
            var _author = new Author()
            {
                FullName = author.FullName,
                ImageUrl = author.ImageUrl,
                Description = author.Description
            };
            await _context.Author.AddAsync(_author);
            await _context.SaveChangesAsync();
        }

        public AuthorWithBooksTitleVM GetAuthorsWithBooksTitle (int id)
        {
            var _author = _context.Author.Where(n => n.Id == id).Select(n => new AuthorWithBooksTitleVM()
            {
                FullName = n.FullName,
                BookIds = n.Book_Author.Select(n => n.Book.Id).ToList()
            }).FirstOrDefault();

            return _author;
        }

        public async Task<Author> UpdateAsync(int id, AuthorVM author)
        {
            var _author = await _context.Author.FirstOrDefaultAsync(n => n.Id == id);
            if (_author != null)
            {
                _author.FullName = author.FullName;
                _author.ImageUrl = author.ImageUrl;
                _author.Description = author.Description;

                await _context.SaveChangesAsync();
            };

            return _author;
        }
    }
}
