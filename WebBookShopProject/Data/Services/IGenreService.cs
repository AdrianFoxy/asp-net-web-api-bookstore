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
    public interface IGenreService : IEntityBaseRepository<Genre>
    {
        Task AddGenreAsync(GenreVM genre);
        Task<Genre> UpdateAsync(int id, GenreVM genre);
        Task<IEnumerable<GenreForViewVM>> GetAllWithPaginationAsync(PaginationParams @params);
        Task<GenreDescriptionVM> GetGenreDescByName(string name);
        Task<IEnumerable<GenreDPVM>> GetGenresForDropList();
        Task<GenreForViewVM> GetByForViewIdAsync(int id);
        Task<GenreVM> GetForUpdateByIdAsync(int id);

    }
}
