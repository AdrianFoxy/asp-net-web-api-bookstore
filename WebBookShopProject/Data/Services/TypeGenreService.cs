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

        public async Task<IEnumerable<TypeGenreDPVM>> GetTypeGenresForDropList()
        {

            var result = await _context.TypeGenre.Select(result => new TypeGenreDPVM()
            {
                Id = result.Id,
                Name = result.Name

            }).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<TypeGenreTestVM>> GetTypesAndGenresEng()
        {
            var result = await _context.TypeGenre.Select(genres => new TypeGenreTestVM()
            {
                Name = genres.Name,
                NameEng = genres.NameForUrl,
                GenreNames = genres.Genre.Select(g => new TypeGenreNamesVM
                {
                    Name = g.Name,
                    NameForUrl = g.NameForUrl
                })
                .ToList()


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

        public async Task AddTypeGenreAsync(TypeGenreAddVM typegenre)
        {
            var _typegenre = new TypeGenre()
            {
                Name = typegenre.Name,
                NameForUrl = typegenre.NameForUrl,
                Description = typegenre.Description
            };
            await _context.TypeGenre.AddAsync(_typegenre);
            await _context.SaveChangesAsync();
        }

        public async Task<TypeGenre> UpdateAsync(int id, TypeGenreAddVM typegenre)
        {
            var _typegenre = await _context.TypeGenre.FirstOrDefaultAsync(n => n.Id == id);
            if (_typegenre != null)
            {
                _typegenre.Name = typegenre.Name;
                _typegenre.NameForUrl = typegenre.NameForUrl;
                _typegenre.Description = typegenre.Description;

                await _context.SaveChangesAsync();
            };

            return _typegenre;
        }
    }
}
