using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Data.Services
{
    public interface IBookService
    {
        Task AddBookAsync(BookVM book, string pathImg);
        Task<Book> UpdateAsync(int id, BookImgVM book, string imagePath);
        Task<IEnumerable<Book>> GetAllAsync();

        Task<IEnumerable<BookWithAuthorsVM>> GetAllWithAuthorAsync();
        Task<IEnumerable<BookWithAuthorsVM>> GetAllByAuthor(string fullName);
        Task<IEnumerable<BookWithAuthorsVM>> GetAllByGenre(string genre);
        Task<BookFullInfoVM> GetByIdAsync(int id);
        Task DeleteAsync(int id);
    }
}
