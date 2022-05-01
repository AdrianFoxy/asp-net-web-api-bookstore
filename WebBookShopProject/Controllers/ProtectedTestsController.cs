using AnotherTestProject.Data.Static;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var username = HttpContext.User.Identity.Name;

            return Ok("Hi Admin");
        }

        [HttpGet("Test-protected2-Public")]
        public async Task<IActionResult> GetTest2()
        {
            return Ok("Hi public!");
        }

        [Authorize]
        [HttpGet("Test-protected3-Authorize")]
        public async Task<IActionResult> GetTest3()
        {
            return Ok("Hello Authorize!");
        }
    }
}
