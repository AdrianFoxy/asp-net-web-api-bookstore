using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Base;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface ITypeGenreService : IEntityBaseRepository<TypeGenre>
    {

        Task AddTypeGenreAsync(TypeGenreAddVM typegenre);
        Task<TypeGenre> UpdateAsync(int id, TypeGenreAddVM typegenre);
        Task<IEnumerable<TypeGenreVM>> GetTypesAndGenres();
        Task<TypeGenreDescVM> GetTypeGenreDescByName(string name);
        Task<IEnumerable<TypeGenreTestVM>> GetTypesAndGenresEng();
        Task<IEnumerable<TypeGenreDPVM>> GetTypeGenresForDropList();
    }
}
