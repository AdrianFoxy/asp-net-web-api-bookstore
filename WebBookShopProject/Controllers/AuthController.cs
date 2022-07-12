using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Services;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("get-age-of-current-user")]
        public async Task<IActionResult> GetAge()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Ok("Guest");

            var userinfo = await _userService.GetUserById(userId);
            var age = _userService.GetAge(userinfo.DateofBirth);

            return Ok(age);
        }

        [HttpGet("get-gole-of-current-user")]
        public async Task<IActionResult> GetRole()
        {
            var CurRole = User.FindFirstValue(ClaimTypes.Role);

            if (CurRole == null)
                return Ok("Guest");

            return Ok(CurRole);
        }

        [HttpGet("get-current-user-info")]
        public async Task<IActionResult> GetCurrentUserInfo()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Ok("Guest");

            var userinfo = await _userService.GetUserById(userId);

            return Ok(userinfo);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get-all-users-for-admin")]
        public async Task<IActionResult> GetAllUsers([FromQuery] PaginationParams @params)
        {
            var users = await _userService.GetAllUsers(@params);
            var counter = await _userService.GetAllUsersCount();

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(users);
        }

        [HttpPut("update-user-by-id/{userId}")]
        public async Task<IActionResult> UpdateUserById(string userId, [FromForm] UserUpdateVM book)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var updatedBook = await _userService.UpdateAsync(userId, book);
            return Ok(book);
        }

        // /api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.RegisterUserAsync(model);

                if (result.IsSuccess)
                    return Ok(result); // Code 200

                return BadRequest(result);
            }

            return BadRequest("Some propeties are not valid :*("); // Code 400
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginVM model)
        {
            if (ModelState.IsValid)
            {
                var result = await _userService.LoginUserAsync(model);

                if (result.IsSuccess)
                    return Ok(result);

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid");
        }

    }
}
