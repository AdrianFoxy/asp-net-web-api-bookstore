using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Services;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private IAuthorService _authorService;

        public AuthorController(IAuthorService authorService)
        {
            _authorService = authorService;
        }

        // Get All Authors
        [HttpGet("get-all-author")]
        public async Task<IActionResult> GetAllAuthor()
        {
            var allAuthors = await _authorService.GetAllAsync();
            return Ok(allAuthors);
        }

        // Add new Author
        [HttpPost("add-author")]
        public async Task<IActionResult> AddAuthor([FromBody] AuthorVM author)
        {
            await _authorService.AddAuthorAsync(author);
            return Ok(author);
        }

        // Get Author By Id

        [HttpGet("get-author-with-books-title/{id}")]
        public IActionResult GetAuthorWithBooksTitle(int id)
        {
            var responce = _authorService.GetAuthorsWithBooksTitle(id);
            return Ok(responce);
        }
    }
}
