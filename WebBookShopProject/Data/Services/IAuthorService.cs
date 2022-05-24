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
    public interface IAuthorService : IEntityBaseRepository<Author>
    {
        Task AddAuthorAsync(AuthorVM author, string pathImg);
        Task<Author> UpdateAsync(int id, AuthorVM author, string imagePath);
        AuthorWithBooksTitleVM GetAuthorsWithBooksTitle(int id);
        Task<IEnumerable<Author>> GetAllWithPaginationAsync(PaginationParams @params);

        Task<IEnumerable<AuthorDPVM>> GetAuthorsForDropList();

        Task<IEnumerable<AuthorForFilterVM>> GetAuthorsForFilter();
        

        //Task<IEnumerable<Author>> GetAllAsync();
        //Task<Author> GetByIdAsync(int id);
        //Task DeleteAsync(int id);
    }
}
