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
                Name = genre.Name,
                NameForUrl = genre.NameForUrl,
                Description = genre.Description,
                Fk_TypeGenreId = genre.Fk_TypeGenreId
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
                _genre.NameForUrl = genre.NameForUrl;
                _genre.Description = genre.Description;
                _genre.Fk_TypeGenreId = genre.Fk_TypeGenreId;

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

        public async Task<IEnumerable<GenreDPVM>> GetGenresForDropList()
        {

            var genres = await _context.Genre.Select(genre => new GenreDPVM()
            {
                Id = genre.Id,
                Name = genre.Name

            }).ToListAsync();

            return genres;
        }

        public async Task<GenreForViewVM> GetByForViewIdAsync(int id)
        {
            var _genre = await _context.Genre.Where(n => n.Id == id).Select(genre => new GenreForViewVM()
            {
                Name = genre.Name,
                NameForUrl = genre.NameForUrl,
                Description = genre.Description,
                TypeGenreName = genre.TypeGenre.Name

            }).FirstOrDefaultAsync();

            return _genre;
        }

        public async Task<GenreVM> GetForUpdateByIdAsync(int id)
        {
            var _genre = await _context.Genre.Where(n => n.Id == id).Select(genre => new GenreVM()
            {
                Name = genre.Name,
                NameForUrl = genre.NameForUrl,
                Description = genre.Description,
                Fk_TypeGenreId = genre.Fk_TypeGenreId

            }).FirstOrDefaultAsync();

            return _genre;
        }

        public async Task<IEnumerable<GenreForViewVM>> GetAllWithPaginationAsync(PaginationParams @params)
        {
            var result = await _context.Genre.Select(genre => new GenreForViewVM()
            {
                Id = genre.Id,
                Name = genre.Name,
                NameForUrl = genre.NameForUrl,
                Description = genre.Description,
                TypeGenreName = genre.TypeGenre.Name

            }).OrderBy(p => p.Id)
            .ToListAsync();

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }
    }
}
