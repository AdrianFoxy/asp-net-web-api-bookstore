using AnotherTestProject.Data.Static;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProtectedTestsController : ControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpGet("Test-protected-Admin")]
        public async Task<IActionResult> GetTest()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return Ok(userId);
        }

        [HttpGet("Test-protected2-Public")]
        public async Task<IActionResult> GetTest2()
        {
            var CurRole = User.FindFirstValue(ClaimTypes.Role);

            if (CurRole == null)
                return Ok("NotAuthorized");

            return Ok(CurRole);
        }

        [Authorize]
        [HttpGet("Test-protected3-Authorize")]
        public async Task<IActionResult> GetTest3()
        {

            return Ok("Hello Authorize!");
        }
    }
}
