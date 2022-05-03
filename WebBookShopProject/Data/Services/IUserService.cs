using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.ViewModels;
using WebBookShopProject.Models;

namespace WebBookShopProject.Data.Services
{
    public interface IUserService
    {

        Task<UserManagerResponse> RegisterUserAsync(RegisterVM model);
        Task<UserManagerResponse> LoginUserAsync(LoginVM model);
        Task<UserVM> GetUserById(string userId);
        Task<ApplicationUser> UpdateAsync(string userId, UserUpdateVM model);
    }
}
