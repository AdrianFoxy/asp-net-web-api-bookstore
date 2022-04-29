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
        Task<Book> UpdateAsync(int id, BookVM book, string imagePath);

        //This methods are using for count for pagination Headers
        Task<IEnumerable<Book>> GetAllAsync();

        Task<IEnumerable<Book>> GetAllFavoriteAsync();
        Task<IEnumerable<Book>> GetGenreCountAsync(string genre);
        Task<IEnumerable<Book>> GetTypeGenreCountAsync(string genre);
        Task<IEnumerable<Book>> GetAuthorCountAsync(string author);

        Task<IEnumerable<Book>> GetSeachedCountAsync(string searchedString);


        //Task<BookDropDownListVM> GetBookDropdownsValues();


        Task<Book> GetByIdShopAsync(int id);

        Task<IEnumerable<BookWithAuthorsVM>> GetAllSearchedAsync(PaginationParams @params, string searchedString);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllWithAuthorAsync(PaginationParams @params);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllByAuthor(string fullName, PaginationParams @params);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllByGenre(string genre, PaginationParams @params);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllByTypeGenre(string genre, PaginationParams @params);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllFavoriteBook(PaginationParams @params);
        Task<BookFullInfoVM> GetByIdAsync(int id);
        Task<BookFullInfoForUpdateVM> GetForUpdateByIdAsync(int id);

        Task<UpdateCountBookVM> GetUpdateAmountId(int id);

        Task UpdateBookAmountAsync(UpdateCountBookVM updatedBook, int id);
        Task DeleteAsync(int id);
    }
}
