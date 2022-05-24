using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;
using WebBookShopProject.Data.Dtos;
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

        public async Task AddAuthorAsync(AuthorVM author, string pathImg)
        {
            var _author = new Author()
            {
                FullName = author.FullName,
                NameForUrl = author.NameForUrl,
                ImageUrl = pathImg,
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

        public async Task<IEnumerable<Author>> GetAllWithPaginationAsync(PaginationParams @params)
        {
            var result = await _context.Author.Select(authour => new Author()
            {
                Id = authour.Id,
                FullName = authour.FullName,
                NameForUrl = authour.NameForUrl,
                ImageUrl = authour.ImageUrl,
                Description = authour.Description

            }).OrderBy(p => p.Id)
            .ToListAsync();

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }

        public async Task<IEnumerable<AuthorDPVM>> GetAuthorsForDropList()
        {

            var authors = await _context.Author.Select(item => new AuthorDPVM()
            {
                Id = item.Id,
                FullName = item.FullName

            }).ToListAsync();

            return authors;
        }

        public async Task<IEnumerable<AuthorForFilterVM>> GetAuthorsForFilter()
        {

            var authors = await _context.Author.Select(item => new AuthorForFilterVM()
            {
                Id = item.Id,
                FullName = item.FullName,
                NameForUrl = item.NameForUrl

            }).ToListAsync();

            return authors;
        }


        public async Task<Author> UpdateAsync(int id, AuthorVM author, string imagePath)
        {
            var _author = await _context.Author.FirstOrDefaultAsync(n => n.Id == id);
            if (_author != null)
            {
                _author.FullName = author.FullName;
                _author.NameForUrl = author.NameForUrl;
                _author.ImageUrl = imagePath;
                _author.Description = author.Description;

                await _context.SaveChangesAsync();
            };

            return _author;
        }
    }
}
