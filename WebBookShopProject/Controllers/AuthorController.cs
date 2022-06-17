using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WebBookShopProject.Data.Dtos;
using WebBookShopProject.Data.Services;
using WebBookShopProject.Data.ViewModels;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private IAuthorService _authorService;

        private readonly IHostingEnvironment _hostingEnvironment;

        public AuthorController(IAuthorService authorService, IHostingEnvironment hostingEnvironment)
        {
            _authorService = authorService;
            _hostingEnvironment = hostingEnvironment;
        }

        // Get All Authors
        [HttpGet("get-all-author")]
        public async Task<IActionResult> GetAllAuthor()
        {
            var allAuthors = await _authorService.GetAllAsync();
            return Ok(allAuthors);
        }

        [HttpGet("get-all-authors-pagination")]
        public async Task<IActionResult> GetFullAuthorPag([FromQuery] PaginationParams @params)
        {
            var allAuthors = await _authorService.GetAllWithPaginationAsync(@params);
            var counter = await _authorService.GetAllAsync();

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allAuthors);
        }

        [HttpGet("get-authors-for-drop-list")]
        public async Task<IActionResult> GetAuthorsForDropList()
        {
            var responce = await _authorService.GetAuthorsForDropList();
            return Ok(responce);
        }

        [HttpGet("get-authors-for-filter")]
        public async Task<IActionResult> GetAuthorsForFilter()
        {
            var responce = await _authorService.GetAuthorsForFilter();
            return Ok(responce);
        }

        

        // Get Author By Id

        [HttpGet("get-author-with-books-title/{id}")]
        public IActionResult GetAuthorWithBooksTitle(int id)
        {
            var responce = _authorService.GetAuthorsWithBooksTitle(id);
            return Ok(responce);
        }

        [HttpGet("get-author-by-id/{id}")]
        public async Task<IActionResult> GetAuthorById(int id)
        {
            var result = await _authorService.GetByIdAsync(id);
            return Ok(result);
        }

        // Add new Author
        [Authorize(Roles = "Admin")]
        [HttpPost("add-author")]
        public async Task<IActionResult> AddAuthor([FromForm] AuthorVM author, IFormFile image)
        {

            var imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "img", image.FileName); // path for save img ...//img//image.jpg
            var imagePathforForm = ("/img/" + image.FileName); // path for DB /img/image.jpg
            var streamImage = new FileStream(imagePath, FileMode.Append);
            image.CopyTo(streamImage);

            await _authorService.AddAuthorAsync(author, imagePathforForm);
            return Ok(author);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("update-author-by-id/{id}")]
        public async Task<IActionResult> UpdateAuthorById(int id, [FromForm] AuthorVM author, IFormFile image)
        {
            var imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "img", image.FileName);
            var imagePathforForm = ("/img/" + image.FileName); // path for DB /img/image.jpg
            var streamImage = new FileStream(imagePath, FileMode.Append);
            image.CopyTo(streamImage);

            var updatedAuthor = await _authorService.UpdateAsync(id, author, imagePathforForm);
            return Ok(updatedAuthor);
        }

        // Delete Choosen Publisher
        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-author-by-id/{id}")]
        public async Task<IActionResult> DeleteAuthorById(int id)
        {
            await _authorService.DeleteAsync(id);
            return Ok("Deleted");
        }
    }
}
