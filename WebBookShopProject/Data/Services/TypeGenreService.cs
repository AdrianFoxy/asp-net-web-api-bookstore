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
    public class TypeGenreService : EntityBaseRepository<TypeGenre>, ITypeGenreService
    {
        private AppDbContext _context;

        public TypeGenreService(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TypeGenreVM>> GetTypesAndGenres()
        {
            var result = await _context.TypeGenre.Select(genres => new TypeGenreVM()
            {
                Name = genres.Name,
                GenreNames = genres.Genre.Select(n => n.Name).ToList()
            }).ToListAsync();

            return result;
        }

        public async Task<TypeGenreDescVM> GetTypeGenreDescByName(string name)
        {
            var _genre_desc = await _context.TypeGenre.Where(n => n.NameForUrl == name).Select(genre => new TypeGenreDescVM()
            {
                Description = genre.Description

            }).FirstOrDefaultAsync();

            return _genre_desc;
        }
    }
}
