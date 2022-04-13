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
    public class GenreService: EntityBaseRepository<Genre>, IGenreService
    {
        private AppDbContext _context;

        public GenreService(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task AddGenreAsync(GenreVM genre)
        {
            var _genre = new Genre()
            {
                Name = genre.Name
            };
            await _context.Genre.AddAsync(_genre);
            await _context.SaveChangesAsync();
        }

        public async Task<Genre> UpdateAsync(int id, GenreVM genre)
        {
            var _genre = await _context.Genre.FirstOrDefaultAsync(n => n.Id == id);
            if (_genre != null)
            {
                _genre.Name = genre.Name;

                await _context.SaveChangesAsync();
            };

            return _genre;
        }

        public async Task<GenreDescriptionVM> GetGenreDescByName(string name)
        {
            var _genre_desc = await _context.Genre.Where(n => n.NameForUrl == name).Select(genre => new GenreDescriptionVM()
            {
                Description = genre.Description

            }).FirstOrDefaultAsync();

            return _genre_desc;
        }
    }
}
