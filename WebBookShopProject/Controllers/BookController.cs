using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebBookShopProject.Data.Models;
using WebBookShopProject.Data.Services;
using WebBookShopProject.Data.ViewModels;
using WebBookShopProject.Data.Dtos;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WebBookShopProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        public IBookService _bookService;
        private IUserService _userService;
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment;

        [Obsolete]
        public BookController(IBookService bookService, IHostingEnvironment hostingEnvironment, IUserService userService)
        {
            _bookService = bookService;
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
        }

        [Authorize]
        [HttpGet("get-age-recommendations(authorizedOnly)")]
        public async Task<IActionResult> GetExisted()
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Ok("Guest");

            var userinfo = await _userService.GetUserById(userId);
            var age = _userService.GetAge(userinfo.DateofBirth);

            int age2 = Convert.ToInt32(age);

            //var res = await _bookService.GetBookForAgeGroup(21);

            var res = await _bookService.GetRecomentByDif(userId, age2);
            return Ok(res);
        }


        // Get Books by Genre Name
        [HttpGet("get-all-books-by-genre/{genre}")]
        public async Task<IActionResult> GetBooksByGenre([FromQuery] PaginationParams @params, string genre)
        {
            var allBook = await _bookService.GetAllByGenre(genre, @params);
            var counter = await _bookService.GetGenreCountAsync(genre);

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        // Get Books by Genre Name
        [HttpGet("get-all-books-by-typegenre/{genre}")]
        public async Task<IActionResult> GetBooksByTypeGenre([FromQuery] PaginationParams @params, string genre)
        {
            var allBook = await _bookService.GetAllByTypeGenre(genre, @params);
            var counter = await _bookService.GetTypeGenreCountAsync(genre);

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        // Get Books by Author Name
        [HttpGet("get-all-books-by-author/{fullName}")]
        public async Task<IActionResult> GetBooksByAuthor([FromQuery] PaginationParams @params, string fullName)
        {
            var allBook = await _bookService.GetAllByAuthor(fullName, @params);
            var counter = await _bookService.GetAuthorCountAsync(fullName);

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        [HttpGet("get-all-favorite-books")]
        public async Task<IActionResult> GetAllFavoriteBooks([FromQuery] PaginationParams @params)
        {
            var allBook = await _bookService.GetAllFavoriteBook(@params);
            var counter = await _bookService.GetAllFavoriteAsync();

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        [HttpGet("get-what-to-read")]
        public async Task<IActionResult> GetWhatToRead()
        {
            var allBook = await _bookService.GetWhatToReadsync();

            return Ok(allBook);
        }

        // List of all books + info about genres and authors
        // I used there my own terrible method, so it can be broken)))
        [HttpGet("get-all-books-info")]
        public async Task<IActionResult> GetFullAllBook([FromQuery] PaginationParams @params)
        {
            var allBook = await _bookService.GetAllWithAuthorAsync(@params);
            var counter = await _bookService.GetAllAsync();

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        [HttpGet("get-searched-books")]
        public async Task<IActionResult> GetSearchedBooks([FromQuery] PaginationParams @params, string searchString)
        {

            var allBook = await _bookService.GetAllSearchedAsync(@params, searchString);
            var counter = await _bookService.GetSeachedCountAsync(searchString);

            var paginationMetadata = new PaginationMetadata(counter.Count(), @params.Page, @params.ItemsPerPage);
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(paginationMetadata));

            return Ok(allBook);
        }

        // List of all book
        [HttpGet("get-all-books")]
        public async Task<IActionResult> GetAllBook()
        {
            var allBooks = await _bookService.GetAllAsync();
            return Ok(allBooks);
        }

        // Get info about book by Id
        [HttpGet("get-book-by-id/{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _bookService.GetByIdAsync(id);
            return Ok(book);
        }

        // Get info about book by Id
        [HttpGet("get-book-for-update-by-id/{id}")]
        public async Task<IActionResult> GetBookForUpdateById(int id)
        {
            var book = await _bookService.GetForUpdateByIdAsync(id);
            return Ok(book);
        }


        // Update choosed Book
        [Authorize(Roles = "Admin")]
        [HttpPut("update-book-by-id/{id}")]
        public async Task<IActionResult> UpdateBookById(int id, [FromForm] BookVM book, IFormFile image)
        {
            var imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "img", image.FileName);
            var imagePathforForm = ("/img/" + image.FileName); // path for DB /img/image.jpg
            var streamImage = new FileStream(imagePath, FileMode.Append);
            image.CopyTo(streamImage);

            var updatedBook = await _bookService.UpdateAsync(id, book, imagePathforForm);
            return Ok(book);
        }


        // Delete choosed Book
        [Authorize(Roles = "Admin")]
        [HttpDelete("delete-book-by-id/{id}")]
        public async Task<IActionResult> DeleteBookById(int id)
        {
            await _bookService.DeleteAsync(id);
            return Ok("Deleted");
        }

        // All API's for ADD BOOK

        // Add New Book with Image
        [Authorize(Roles = "Admin")]
        [HttpPost("add-book")]
        public async Task<IActionResult> AddBookImage([FromForm] BookVM book, IFormFile image)
        {
            var imagePath = Path.Combine(_hostingEnvironment.WebRootPath, "img", image.FileName); // path for save img ...//img//image.jpg
            var imagePathforForm = ("/img/" + image.FileName); // path for DB /img/image.jpg
            var streamImage = new FileStream(imagePath, FileMode.Append);
            image.CopyTo(streamImage);

            await _bookService.AddBookAsync(book, imagePathforForm);

            return Ok(book);
        }

    }
}
