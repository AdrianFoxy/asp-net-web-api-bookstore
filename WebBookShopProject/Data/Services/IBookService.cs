using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface IBookService
    {
        Task AddBookAsync(BookVM book, string pathImg);
        Task<Book> UpdateAsync(int id, BookImgVM book, string imagePath);

        //This methods are using for count for pagination Headers
        Task<IEnumerable<Book>> GetAllAsync(); 
        Task<IEnumerable<Book>> GetGenreCountAsync(string genre);
        Task<IEnumerable<Book>> GetAuthorCountAsync(string author);


        Task<IEnumerable<BookWithAuthorsVM>> GetAllWithAuthorAsync(PaginationParams @params);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllByAuthor(string fullName, PaginationParams @params);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllByGenre(string genre, PaginationParams @params);
        Task<BookFullInfoVM> GetByIdAsync(int id);
        Task DeleteAsync(int id);
    }
}
