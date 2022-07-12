using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.ViewModels;
using WebBookShopProject.Models;

namespace WebBookShopProject.Data.Services
{
    public interface IUserService
    {

        Task<UserManagerResponse> RegisterUserAsync(RegisterVM model);
        Task<UserManagerResponse> LoginUserAsync(LoginVM model);
        Task<UserVM> GetUserById(string userId);
        Task<IEnumerable<UserVM>> GetAllUsers (PaginationParams @params);
        Task<IEnumerable<UserVM>> GetAllUsersCount ();
        Task<ApplicationUser> UpdateAsync(string userId, UserUpdateVM model);
        object GetAge(DateTime? dateOfBirth);
    }
}
