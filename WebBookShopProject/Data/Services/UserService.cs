using AnotherTestProject.Data.Static;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.ViewModels;
using WebBookShopProject.Models;

namespace WebBookShopProject.Data.Services
{
    public class UserService : IUserService
    {
        private UserManager<ApplicationUser> _userManager;
        private IConfiguration _configuration;
        private AppDbContext _context;

        public UserService(UserManager<ApplicationUser> userManager, IConfiguration configuration, AppDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        public async Task<UserManagerResponse> LoginUserAsync(LoginVM model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if(user == null)
            {
                return new UserManagerResponse
                {
                    Message = "There is no user with this Email",
                    IsSuccess = false
                };
            }
            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!result)
                return new UserManagerResponse
                {
                    Message = "Invalid password",
                    IsSuccess = false
                };

            var claims = new[]
            {
                new Claim("Email", model.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            var roles = await _userManager.GetRolesAsync(user); // note: you have a typo in "_userManger"

            var claimsWithRoles = roles.Select(role => new Claim(ClaimTypes.Role, role));
            var allClaims = claims.Concat(claimsWithRoles);


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));
            var token = new JwtSecurityToken(
                issuer: _configuration["AuthSettings:Issuer"],
                audience: _configuration["AuthSettings:Audience"],
                claims: allClaims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            return new UserManagerResponse
            {
                Message = tokenAsString,
                IsSuccess = true,
                ExpireDate = token.ValidTo
            };
        }

        public async Task<UserManagerResponse> RegisterUserAsync(RegisterVM model)
        {
            if (model == null)
                throw new NullReferenceException("Register Model is null");

            if (model.Password != model.ConfirmPassword)
                return new  UserManagerResponse
                {
                    Message = "Confirm password doesnt match the password",
                    IsSuccess = false
                };

            var userCheck = await _userManager.FindByEmailAsync(model.Email);

            //if (userCheck != null)
            //{
            //    return new UserManagerResponse
            //    {
            //        Message = "This Email is already exists",
            //        IsSuccess = false,
            //        Errors = result.Errors.Select(e => e.Description)
            //    };
            //}

            var identityUser = new ApplicationUser()
            {
                FullName = model.FullName,
                PhoneNumber = model.Phone,
                Email = model.Email,
                UserName = model.UserName,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(identityUser, model.Password);
            await _userManager.AddToRoleAsync(identityUser, UserRoles.User);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                var claims = new[]
                {
                    new Claim("Email", model.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                };

                var roles = await _userManager.GetRolesAsync(user); // note: you have a typo in "_userManger"

                var claimsWithRoles = roles.Select(role => new Claim(ClaimTypes.Role, role));
                var allClaims = claims.Concat(claimsWithRoles);


                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));
                var token = new JwtSecurityToken(
                    issuer: _configuration["AuthSettings:Issuer"],
                    audience: _configuration["AuthSettings:Audience"],
                    claims: allClaims,
                    expires: DateTime.Now.AddDays(30),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

                string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

                return new UserManagerResponse
                {
                    Message = tokenAsString,
                    IsSuccess = true,
                    ExpireDate = token.ValidTo
                };

                // Сюда добавить выдачу токена
                // Тут можно будет добавить отпраку потдверждающего Email'а
                //return new UserManagerResponse
                //{
                //    Message = "User created successfully",
                //    IsSuccess = true
                //};
            }

            return new UserManagerResponse
            {
                Message = "User did not create",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };

        }

        public async Task<IEnumerable<UserVM>> GetAllUsers(PaginationParams @params)
        {
            var result = await _context.Users.Select(user => new UserVM()
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Phone = user.PhoneNumber,
                Email = user.Email
            }).OrderBy(p => p.Id)
            .ToListAsync();

            var items = result.Skip((@params.Page - 1) * @params.ItemsPerPage)
            .Take(@params.ItemsPerPage);

            return items;
        }

        public async Task<IEnumerable<UserVM>> GetAllUsersCount()
        {
            var result = await _context.Users.Select(user => new UserVM()
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Phone = user.PhoneNumber,
                Email = user.Email
            }).OrderBy(p => p.Id)
            .ToListAsync();

            return result;
        }

        public async Task<UserVM> GetUserById(string userId)
        {
            var result = await _context.Users.Where(n => n.Id == userId).Select(user => new UserVM()
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Phone = user.PhoneNumber,
                Email = user.Email
                
            }).FirstOrDefaultAsync();

            return result;
        }

        public async Task<ApplicationUser> UpdateAsync(string userId, UserUpdateVM model)
        {

            var result = await _context.Users.FirstOrDefaultAsync(n => n.Id == userId);
            if (result != null)
            {
                result.FullName = model.FullName;
                result.UserName = model.Email;
                result.NormalizedUserName = model.Email.ToUpper();
                result.PhoneNumber = model.Phone;
                result.Email = model.Email;
                result.NormalizedEmail = model.Email.ToUpper();


                await _context.SaveChangesAsync();
            };

            return result;
        }
    }
}
